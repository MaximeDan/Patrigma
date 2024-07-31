#!/bin/sh

echo "executing docker-entrypoint.sh"

if [ $NODE_ENV == "development" ]; then
  echo "executing npm install"
  npm install
fi

# ici on peut aussi executer automatiquement les migrations des bases de données

exec "$@"
