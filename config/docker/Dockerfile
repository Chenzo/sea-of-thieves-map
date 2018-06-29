FROM alpine:3.5

RUN apk --no-cache add curl

RUN mkdir -p /storage/nginx
COPY config/nginx /storage/nginx

RUN mkdir -p /storage/www
COPY www /storage/www
