#!/bash-wrapper/sh
exec redis-server --port 6380 --save "" --appendonly no --dir /tmp
