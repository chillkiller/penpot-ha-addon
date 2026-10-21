#!/usr/bin/env bash
# Penpot-HA-Addon: Single-Container-Orchestrierung.
# Basis: offizielle penpotapp-Images (2.18.3) — gleiche ENV/Verhalten wie Upstream.
# Same-origin-Strategie: kein PENPOT_PUBLIC_URI => Bundles nutzen location.origin
# (verifiziert), was HA-Ingress und LAN/Port-Zugriff gleichzeitig korrekt bedient.
set -euo pipefail

export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PGBIN=/usr/lib/postgresql/17/bin
PGDATA=/data/penpot/pg
BACKEND_DIR=/opt/penpot/backend
EXPORTER_DIR=/opt/penpot/exporter
MCP_DIR=/opt/penpot/mcp
export PGPORT=5433

OPTIONS_FILE=/data/options.json
opt() { { sed -n "s/.*\"$1\"[[:space:]]*:[[:space:]]*\"\{0,1\}\([^\",}]*\)\"\{0,1\}.*/\1/p" "$OPTIONS_FILE" 2>/dev/null || true; } | head -1; }

mkdir -p /var/log/penpot /var/log/postgresql "$PGDATA" /var/run/postgresql /data/penpot/assets
chown -R postgres:postgres "$PGDATA" /var/run/postgresql /var/log/postgresql 2>/dev/null || true

# --- PENPOT_SECRET_KEY: Option, sonst einmalig erzeugen und dauerhaft speichern ---
SECRET_FILE=/data/penpot/secret_key
if [ -n "$(opt secret_key)" ]; then
  echo "$(opt secret_key)" > "$SECRET_FILE"
fi
if [ ! -s "$SECRET_FILE" ]; then
  { tr -d '-' < /proc/sys/kernel/random/uuid; tr -d '-' < /proc/sys/kernel/random/uuid; } > "$SECRET_FILE"
fi
export PENPOT_SECRET_KEY="$(cat "$SECRET_FILE")"

# --- Kern-ENV (wie offizielle docker-compose.yaml) ---
export PENPOT_FLAGS="${PENPOT_FLAGS:-disable-email-verification disable-secure-session-cookies enable-prepl-server enable-mcp}"
export PENPOT_DATABASE_URI="postgresql://127.0.0.1:5433/penpot"
export PENPOT_DATABASE_USERNAME="penpot"
export PENPOT_DATABASE_PASSWORD="penpot"
export PENPOT_REDIS_URI="redis://127.0.0.1:6380/0"
export PENPOT_OBJECTS_STORAGE_BACKEND="fs"
export PENPOT_OBJECTS_STORAGE_FS_DIRECTORY="/data/penpot/assets"
export PENPOT_HTTP_SERVER_MAX_BODY_SIZE="${PENPOT_HTTP_SERVER_MAX_BODY_SIZE:-367001600}"

# --- 1) PostgreSQL ---
if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "[penpot] initdb in $PGDATA"
  su postgres -s /bin/bash -c "$PGBIN/initdb -D $PGDATA -U penpot --auth-local=trust --auth-host=trust -E utf8 --data-checksums"
fi
echo "[penpot] 1/5 startet PostgreSQL (127.0.0.1:5433)"
su postgres -s /bin/bash -c "$PGBIN/pg_ctl -D $PGDATA -w -t 60 start -o '-p 5433 -c listen_addresses=127.0.0.1' -l /var/log/postgresql/pg.log"
until psql -h 127.0.0.1 -p 5433 -U penpot -d postgres -c 'SELECT 1' >/dev/null 2>&1; do
  sleep 1
done
psql -h 127.0.0.1 -p 5433 -U penpot -d postgres -c 'CREATE DATABASE penpot OWNER penpot' >/dev/null 2>&1 || true

# --- 2) Redis ---
echo "[penpot] 2/5 startet Redis (127.0.0.1:6380)"redis-server --port 6380 --daemonize yes --save "" --appendonly no --dir /tmp
until redis-cli -p 6380 ping 2>/dev/null | grep -q PONG; do sleep 0.5; done

# --- 3)Frontend-JS-Flags injecten (wie offizieller nginx-entrypoint.sh) ---
if [ -n "$PENPOT_FLAGS" ]; then
  sed -i "s|^//var penpotFlags = .*|var penpotFlags = \"$PENPOT_FLAGS\";|" /usr/share/nginx/html/app/js/config.js || true
fi


# --- Frontend-Ingress-Shim (fetch/XHR/WS auf Ingress-Präfix umschreiben) ---
SHIM=/usr/share/nginx/html/app/js/ingress-shim.js
cp "$(dirname "$0")/ingress-shim.js" "$SHIM" 2>/dev/null || true
if [ ! -s "$SHIM" ]; then
  # fallback: shim liegt im build unter /opt/penpot/addon/
  cp /opt/penpot/addon/ingress-shim.js "$SHIM" 2>/dev/null || true
fi
if [ -s "$SHIM" ]; then
  if ! grep -q "ingress-shim" /usr/share/nginx/html/app/index.html; then
    sed -i 's|<head>|<head>\n<script src="./js/ingress-shim.js"></script><!-- ingress-shim -->|' /usr/share/nginx/html/app/index.html
  fi
fi

# --- config.js-Template für den sub_filter-Public-URI-Ingress-Fix (penpot-issue#7384) ---
CFG=/usr/share/nginx/html/app/js/config.js
if [ -s "$CFG" ] && ! grep -q 'penpotPublicURI' "$CFG"; then
  printf '\n//var penpotPublicURI = "";\n' >> "$CFG"
fi

# --- 4) Backend (JVM :6060), Exporter (:6061), MCP (:4401/:4402) ---
export JAVA_HOME=/opt/jre
export PATH="$JAVA_HOME/bin:$PATH"
export LD_LIBRARY_PATH="${LD_LIBRARY_PATH:-/opt/imagick/lib/deps}"
export JAVA_OPTS="-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager -Dlog4j2.configurationFile=log4j2.xml -XX:-OmitStackTraceInFastThrow --sun-misc-unsafe-memory-access=allow --enable-native-access=ALL-UNNAMED --enable-preview"

# MCP bindet auf [::1] — Backend muss dasselbe (und nginx braucht ein echtes iface):
export PENPOT_MCP_SERVER_HOST="0.0.0.0"
export NODE_OPTIONS="--dns-result-order=ipv4first"

echo "[penpot] 3/5 startet Backend (JVM, 127.0.0.1:6060)"
cd "$BACKEND_DIR"
java $JAVA_OPTS -jar penpot.jar -m app.main >> /var/log/penpot/backend.log 2>&1 &
BACKEND_PID=$!
cd /

echo "[penpot] 4/5 startet Exporter (127.0.0.1:6061)"
cd "$EXPORTER_DIR"
PENPOT_BACKEND_URI="http://127.0.0.1:6060" \
PENPOT_EXPORTER_URI="http://127.0.0.1:6061" \
PENPOT_INTERNAL_URI="${PENPOT_INTERNAL_URI:-http://127.0.0.1:9001}" \
PENPOT_REDIS_URI="${PENPOT_REDIS_URI:-redis://127.0.0.1:6380/0}" \
PENPOT_PUBLIC_URI="${PENPOT_PUBLIC_URI:-http://127.0.0.1:9001}" \
node app.js >> /var/log/penpot/exporter.log 2>&1 &
EXPORTER_PID=$!
cd /

echo "[penpot] startet MCP (127.0.0.1:4401/4402)"
cd "$MCP_DIR"
PENPOT_MCP_REDIS_URI="${PENPOT_MCP_REDIS_URI:-redis://127.0.0.1:6380/0}" \
PENPOT_MCP_SERVER_PORT="${PENPOT_MCP_SERVER_PORT:-4401}" \
PENPOT_MCP_WEBSOCKET_PORT="${PENPOT_MCP_WEBSOCKET_PORT:-4402}" \
node index.js --multi-user >> /var/log/penpot/mcp.log 2>&1 &
MCP_PID=$!
cd /

# --- 5) nginx (Vordergrund-PID 1-Kind; :9001) ---
echo "[penpot] 5/5 startet nginx (0.0.0.0:9001)"
nginx -g 'daemon off;' &
NGINX_PID=$!

shutdown() {
  echo "[penpot] TERM empfangen — fahre herunter"
  nginx -s quit 2>/dev/null || true
  kill "$BACKEND_PID" "$EXPORTER_PID" "$MCP_PID" 2>/dev/null || true
  su postgres -s /bin/bash -c "$PGBIN/pg_ctl -D $PGDATA stop -m fast" 2>/dev/null || true
  exit 0
}
trap shutdown TERM INT

# Watchdog: Container lebt nur, solange nginx UND backend leben
while kill -0 "$NGINX_PID" 2>/dev/null && kill -0 "$BACKEND_PID" 2>/dev/null; do
  sleep 5
done
echo "[penpot] kritischer Prozess beendet — Container stoppt"
exit 1