# CADViewer React class component sample - static build served by nginx (Coolify build pack: Dockerfile).
# REACT_APP_* values are read by Create React App at build time.

FROM node:20-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

ARG REACT_APP_SERVER_BACKEND_URL=http://localhost:3000/
ARG REACT_APP_INIT_FILE_NAME=
# react-scripts 4 (webpack 4) needs the legacy OpenSSL provider on Node 17+
ENV REACT_APP_SERVER_BACKEND_URL=$REACT_APP_SERVER_BACKEND_URL \
    REACT_APP_INIT_FILE_NAME=$REACT_APP_INIT_FILE_NAME \
    NODE_OPTIONS=--openssl-legacy-provider \
    GENERATE_SOURCEMAP=false \
    CI=false

COPY . .
RUN npx react-scripts build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
