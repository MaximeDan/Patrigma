FROM node:20-alpine AS build

COPY . /patrigma/

WORKDIR /patrigma

RUN npm install
RUN npm run build

FROM node:20-alpine AS next

LABEL org.opencontainers.image.source https://github.com/MaximeDan/Patrigma.git

WORKDIR /patrigma

COPY --from=build /patrigma/package.json .
COPY --from=build /patrigma/node_modules ./node_modules
COPY --from=build /patrigma/.next ./.next
COPY --from=build /patrigma/public ./public
COPY --from=build /patrigma/prisma ./prisma
COPY --from=build /patrigma/next.config.mjs .

EXPOSE 3000

COPY docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint

RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT [ "docker-entrypoint" ]

CMD ["npm", "run", "start"]

