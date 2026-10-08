FROM node:20-bookworm-slim AS base

# Install openssl and curl
RUN apt-get update && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Ensure upload and data directories exist
RUN mkdir -p /app/data /app/public/uploads

# Build Next.js application for production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Make docker-entrypoint executable
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "start"]
