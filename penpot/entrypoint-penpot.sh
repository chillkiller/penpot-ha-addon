#!/usr/bin/env bash
# Penpot-HA-Addon-Wrap (Weg D): orchestriert postgres + redis + backend + nginx im Add-on-Container. Persistenz: /data/penpot (-addon-data, überlebt Rebuilds).
set -e
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PGBIN=/usr/lib/postgresql/17/bin
PGDATA=/data/penpot/pg
PGUSER=penpot
export PGPORT=5433

echo "[penpot] 1/4 Postgres"
mkdir -p "$PGDATA" /var/run/postgresql
chown -R postgres:postgres "$PGDATA" /var/run/postgresql /var/log/postgresql 2>/dev/null || true
if [ ! -f "$PGDATA/PG_VERSION" ]; then
  su postgres -c "$PGBIN/initdb -D $PGDATA -U $PGUSER --auth-local=trust --auth-host=trust -E utf8"
fi
su postgres -c "$PGBIN/pg_ctl -D $PGDATA -o '-p 5433' -l /var/log/postgresql/pg.log -w start"
su postgres -c "psql -p 5433 -U $PGUSER -d postgres -c \"CREATE DATABASE $PGUSER OWNER $PGUSER\" 2>/dev/null || true"

echo "[penpot] 2/4 Redis"
redis-server --port 6380 --daemonize yes --save "" --appendonly no --dir /tmp
redis-cli -p 6380 ping

echo "[penpot] 3/4 Backend (JVM)"
export PENPOT_FLAGS="${PENPOT_FLAGS:-disable-email-verification disable-secure-session-cookies enable-prepl-server enable-mcp}"
export PENPOT_DATABASE_URI="postgresql://127.0.0.1:5433/penpot"
export PENPOT_DATABASE_USERNAME="$PGUSER"
export PENPOT_DATABASE_PASSWORD="penpot"
export PENPOT_REDIS_URI="redis://127.0.0.1:6380/0"
export PENPOT_ASSETS_STORAGE_BACKEND="assets-fs"
export PENPOT_ASSETS_FS_DIRECTORY="/data/penpot/assets"
export PENPOT_PUBLIC_URI="${PENPOT_PUBLIC_URI:-http://localhost:9001}"
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-arm64
export LD_LIBRARY_PATH="$JAVA_HOME/lib:$JAVA_HOME/lib/server"
mkdir -p /data/penpot/assets
setsid bash -c 'cd /opt/penpot/backend && exec java $JAVA_OPTS -jar penpot.jar -m app.main' \
  > /var/log/penpot-backend.log 2>&1 < /dev/null &

echo "[penpot] 4/4 Frontend (nginx :9001)"
nginx -g 'daemon off;' &
wait
