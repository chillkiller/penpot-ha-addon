ARG BUILD_FROM="debian:trixie-slim"
FROM $BUILD_FROM

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-17 postgresql-contrib postgresql-client \
    redis-server \
    openjdk-21-jre-headless \
    nginx nginx-common curl ca-certificates bash procps iproute2 tini xz-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# S6-Overlay (HA-Add-on-Contract: Supervisor erwartet s6) — Version fixieren
ARG S6_ARCH="aarch64"
ADD https://github.com/just-containers/s6-overlay/releases/download/v3.2.0.2/s6-overlay-noarch.tar.xz /tmp/
RUN tar -C / -xf /tmp/s6-overlay-noarch.tar.xz && rm /tmp/s6-overlay-noarch.tar.xz
ADD https://github.com/just-containers/s6-overlay/releases/download/v3.2.0.2/s6-overlay-${S6_ARCH}.tar.xz /tmp/
RUN tar -C / -xf /tmp/s6-overlay-${S6_ARCH}.tar.xz && rm /tmp/s6-overlay-${S6_ARCH}.tar.xz

# Penpot-Artefakte
COPY backend /opt/penpot/backend
COPY frontend /usr/share/nginx/html
COPY frontend-nginx/etc/nginx/ /etc/nginx/
COPY s6/ /etc/s6-overlay/scripts/
COPY entrypoint-penpot.sh /entrypoint.sh
COPY run.sh /run.sh

RUN chmod +x /entrypoint.sh /run.sh /etc/s6-overlay/scripts/* 2>/dev/null; \
    useradd -r -d /var/lib/postgresql postgres 2>/dev/null; \
    mkdir -p /var/run/postgresql /var/log/postgresql /var/log/nginx /var/lib/nginx /etc/s6-overlay/etc/s6-compile.d && \
    chown -R postgres:postgres /var/run/postgresql /var/lib/postgresql /var/log/postgresql

ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2 \
    PGBIN=/usr/lib/postgresql/17/bin \
    PGDATA=/data/penpot/pg \
    PGPORT=5433

ENTRYPOINT ["/init"]
