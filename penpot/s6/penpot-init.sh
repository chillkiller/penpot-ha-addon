#!/bash-wrapper/sh
# init once: pg cluster + dirs (persist /data/penpot)
set -e
mkdir -p "$PGDATA" /var/run/postgresql /data/penpot/assets /var/log/penpot
chown -R postgres:postgres "$PGDATA" /var/run/postgresql /var/log/postgresql
if [ ! -f "$PGDATA/PG_VERSION" ]; then
  su postgres -c "$PGBIN/initdb -D $PGDATA -U penpot --auth-local=trust --auth-host=trust -E utf8"
fi
su postgres -c "$PGBIN/pg_ctl -D $PGDATA -o '-p 5433' -l /var/log/postgresql/pg.log -w start"
su postgres -c "psql -p 5433 -U penpot -d postgres -c \"CREATE DATABASE penpot OWNER penpot\" 2>/dev/null" || true
su postgres -c "$PGBIN/pg_ctl -D $PGDATA stop -m fast" || true
