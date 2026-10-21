ARG BUILD_FROM="debian:trixie-slim"

# Penpot-Layer kommen aus den OFFIZIELLEN penpotapp-Images (Multi-Stage):
# keine Binaries/Jars/Assets im Git-Tree — 1:1 gleiche Dateien wie Upstream.
FROM penpotapp/backend:2.18.3 AS penpot-backend
FROM penpotapp/frontend:2.18.3 AS penpot-frontend
FROM penpotapp/exporter:2.18.3 AS penpot-exporter
FROM penpotapp/mcp:2.18.3 AS penpot-mcp

FROM $BUILD_FROM

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-17 postgresql-contrib postgresql-client \
    redis-server \
    nginx \
    curl ca-certificates bash procps iproute2 tini xz-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Backend (JV M-Runtime, penpot.jar, builtin Templates):
COPY --from=penpot-backend /opt/penpot/backend /opt/penpot/backend
COPY --from=penpot-backend /opt/jre /opt/jre
COPY --from=penpot-backend /opt/imagick /opt/imagick
COPY --from=penpot-backend /etc/fonts /etc/fonts
COPY --from=penpot-backend /usr/share/fonts /usr/share/fonts

# Frontend (statische App unter /usr/share/nginx/html/app, wie Upstream-Docroot):
COPY --from=penpot-frontend /var/www/app /usr/share/nginx/html/app

# Exporter (PNG/SVG/PDF-Export): node 24.20 + Playwright-Browser + native Libs
COPY --from=penpot-exporter /opt/penpot/exporter /opt/penpot/exporter
COPY --from=penpot-exporter /opt/penpot/browsers /opt/penpot/browsers
# Node-Runtime + Native-Deps vom Exporter/MCP-Node-Image (node lebt in /usr/bin,
# Libs in /usr/lib — nur gezielt mergen, debian-Basis bleibt intakt):
COPY --from=penpot-exporter /usr/bin/node /usr/bin/node
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libnode.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libnss3.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libnssutil3.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libsmime3.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libssl3.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libplc4.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libplds4.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libsoftokn3.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libfreeblpriv3.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libnspr4.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libicu*.so* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libjpeg* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libpng* /usr/lib/aarch64-linux-gnu/
COPY --from=penpot-exporter /usr/lib/aarch64-linux-gnu/libsharp-* /usr/lib/aarch64-linux-gnu/ || true
COPY --from=penpot-exporter /usr/share/fonts /usr/share/fonts

# MCP (HTTP :4401 + WebSocket :4402, gleiche Node-Version 24.20 wie Exporter):
COPY --from=penpot-mcp /opt/penpot/mcp /opt/penpot/mcp

# Add-on-Schicht (nginx-Konfiguration, Launcher):
COPY frontend-nginx/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY frontend-nginx/etc/nginx/nginx-security-headers.conf /etc/nginx/nginx-security-headers.conf
COPY frontend-nginx/etc/nginx/conf.d/ /etc/nginx/conf.d/
COPY frontend-nginx/etc/nginx/overrides/ /etc/nginx/overrides/
COPY entrypoint.sh /entrypoint.sh
COPY run.sh /run.sh

RUN chmod +x /entrypoint.sh /run.sh \
 && useradd -r -m postgres 2>/dev/null; exit 0

ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2 \
    PGBIN=/usr/lib/postgresql/17/bin \
    PGDATA=/data/penpot/pg \
    PGPORT=5433

ENTRYPOINT ["/entrypoint.sh"]