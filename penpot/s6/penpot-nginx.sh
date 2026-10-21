#!/bash-wrapper/sh
mkdir -p /var/cache/nginx /var/lib/nginx/body
exec nginx -g 'daemon off;'
