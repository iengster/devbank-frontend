# ── Stage 1: build the React app ────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files first (layer cache optimisation)
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: serve with nginx ────────────────────────────
FROM nginx:1.25-alpine

# Copy built assets from stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
