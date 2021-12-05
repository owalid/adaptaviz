FROM node:14-alpine

WORKDIR /home/app

# RUN apk --no-cache add --update python make g++

COPY docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

ENV NODE_ENV=dev
ENV BASE_API_URL="localhost:5000/api"
ENV BASE_FRONT_URL="http://localhost:3000"
ENV NUXT_HOST=0.0.0.0
ENV HOST=0.0.0.0
ENV NUXT_PORT=3000


CMD ["yarn", "dev"]

EXPOSE 3000