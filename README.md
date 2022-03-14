[![Build](https://github.com/mediathekview/zapp-backend/actions/workflows/build.yml/badge.svg)](https://github.com/mediathekview/zapp-backend/actions/workflows/build.yml) [![Publish](https://github.com/mediathekview/zapp-backend/actions/workflows/publish.yml/badge.svg)](https://github.com/mediathekview/zapp-backend/actions/workflows/publish.yml)

# zapp-backend

Program info API for German public broadcasting services.

This is a small **node.js** server to get current programm information (start and end time, title, description, etc.) from many German public broadcasting services as JSON. It is used by the Android app [Zapp](https://github.com/cemrich/zapp)


## Getting started

1. You need [node.js](http://nodejs.org/) installed on your machine to run this project.
1. Check out the project using Git.
1. Run `npm install` inside the newly created directory.
1. Set PORT as an environment variable inside your console. Eg. `PORT=3000` on linux or `SET PORT=3000` on windows.
1. Run `npm start`.
1. Open your browser and head to `http://localhost:3000/v1/shows/das_erste` (or replace 3000 with your PORT value) to get program info for ARD.

## Test

- Run `npm test` to run linting and basic function tests.
- Run `npm lint` to run jshint and check for code style errors.

## Deployment

This app gets auto deployed via github action whenever a taged commit is pushed.

To deploy tag your commit using demantic versioning. Make sure to update the version in [index.js](index.js) accordingly.

## How to use the docker image

`docker run --name zapp-backend -p 80:3000 mediathekview/zapp-backend`

### Kubernetes

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: mediathekview
---
apiVersion: v1
kind: Service
metadata:
  name: zapp-backend
  namespace: mediathekview

spec:
  ports:
    - name: http
      protocol: TCP
      port: 3000
  selector:
    app: zapp-backend
---
kind: Deployment
apiVersion: apps/v1
metadata:
  namespace: mediathekview
  name: zapp-backend
  labels:
    app: zapp-backend

spec:
  replicas: 1
  selector:
    matchLabels:
      app: zapp-backend
  template:
    metadata:
      labels:
        app: zapp-backend
    spec:
      containers:
        - name: zapp-backend
          image: mediathekview/zapp-backend
          ports:
            - name: web
              containerPort: 3000
---
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  name: zapp-backend-ingress
  namespace: mediathekview

spec:
  rules:
    - host: api.zapp.mediathekview.de
      http:
        paths:
          - path: /
            backend:
              serviceName: zapp-backend
              servicePort: 3000
```
