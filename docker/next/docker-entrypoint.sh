#!/bin/sh

echo "executing docker-entrypoint.sh"

if [ $NODE_ENV == "development" ]; then
  echo "executing npm install"
  npm install
fi

# ici on peut aussi executer automatiquement les migrations des bases de données
if [ $NODE_ENV == "production" ]; then
  echo "deploying prisma migrations..."
  npx prisma migrate deploy
  echo "seeding prisma database..."
  npx prisma db seed
fi


exec "$@"
