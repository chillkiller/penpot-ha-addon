ARG BUILD_FROM="ghcr.io/hassio/base-aarch64:latest"
# Weg-D (GaRoN 10:30): HÀ-konform — Penpot-Layer kommen aus den OFFIZIELLEN
# penpotapp-Images (multi-stage): backend (JVM + jar + templates), frontend
# (nginx + assets). KEINE Binaries im Git-Tree.
FROM penpotapp/backend:2.18.3 AS penpot-backend
FROM penpotapp/frontend:2.18.3 AS penpot-frontend
FROM $BUILD_FROM

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-17 postgresql-contrib postgresql-client \
    redis-server \
    curl ca-certificates bash procps iproute2 tini \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Java 21 (penpot.jar braucht JDK21 — Debian openjdk-21):
RUN apt-get update && apt-get install -y --no-install-recommends openjdk-21-jre-headless \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Penpot-Layer aus den offiziellen Images:
COPY --from=penpot-backend /opt/penpot/backend /opt/penpot/backend
COPY --from=penpot-frontend /var/www/app /usr/share/nginx/html/app
COPY --from=penpot-frontend /etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=penpot-frontend /etc/nginx/ /etc/nginx/

# Add-on-Schicht (nginx-Konfig, s6-Services, Launcher)
COPY frontend-nginx/ /etc/nginx/
COPY s6/ /etc/s6-overlay/scripts/
COPY entrypoint-penpot.sh /entrypoint.sh
COPY run.sh /run.sh

RUN chmod +x /entrypoint.sh /run.sh && \
    useradd -r -d /var/lib/postgresql postgres 2>/dev/null; exit 0

ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2 \
    PGBIN=/usr/lib/postgresql/17/bin \
    PGDATA=/data/penpot/pg \
    PGPORT=5433

ENTRYPOINT ["/init"]
