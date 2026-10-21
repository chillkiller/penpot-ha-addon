#!/bash-wrapper/sh
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-arm64
export PATH="$JAVA_HOME/bin:$PATH"
export LD_LIBRARY_PATH="$JAVA_HOME/lib:$JAVA_HOME/lib/server"
export PENPOT_DATABASE_URI="postgresql://127.0.0.1:5433/penpot"
export PENPOT_DATABASE_USERNAME=penpot
export PENPOT_DATABASE_PASSWORD=penpot
export PENPOT_REDIS_URI="redis://127.0.0.1:6380/0"
export PENPOT_ASSETS_STORAGE_BACKEND="assets-fs"
export PENPOT_ASSETS_FS_DIRECTORY=/data/penpot/assets
cd /opt/penpot/backend
export JAVA_OPTS="-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager -Dlog4j2.configurationFile=log4j2.xml -XX:-OmitStackTraceInFastThrow --enable-native-access=ALL-UNNAMED"
exec java $JAVA_OPTS -jar penpot.jar -m app.main
