#!/bash-wrapper/sh
su postgres -c "$PGBIN/pg_ctl -D $PGDATA -o '-p 5433' -l /var/log/postgresql/pg.log start" && tail -f /var/log/postgresql/pg.log
