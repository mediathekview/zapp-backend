# This is a multi-stage dockerfile for the zapp-backend

# Build stage
FROM node:lts-alpine AS builder
LABEL maintainer="nicklas@mediathekview.de"
USER 1000
WORKDIR /tmp
# copy app files
COPY . .
# install node packages
RUN npm install

# Run stage
FROM node:lts-alpine
LABEL maintainer="nicklas@mediathekview.de"
# Needed for the application. See Readme -> Getting started
ENV PORT=3000
EXPOSE $PORT
USER 1000
WORKDIR /app
COPY --from=builder --chown=node:node /tmp .
ENTRYPOINT [ "npm", "start" ]
