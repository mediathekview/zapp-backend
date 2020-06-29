# This is a multi-stage dockerfile for the zapp-backend

# Build stage
FROM node:14.4.0-alpine AS builder
LABEL maintainer="nicklas@mediathekview.de"
WORKDIR /usr/src/zapp-backend
# copy app files
COPY . .
# install node packages
RUN npm install

# Run stage
FROM node:14.4.0-alpine
LABEL maintainer="nicklas@mediathekview.de"
ENV PORT=3000
EXPOSE $PORT
USER node
WORKDIR /opt/zapp-backend
COPY --from=builder --chown=node:node /usr/src/zapp-backend .
CMD [ "npm", "start" ]
