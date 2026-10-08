#!/bin/sh
set -e

# Sync Prisma database schema if DATABASE_URL is provided
if [ -n "$DATABASE_URL" ]; then
  echo "=> Syncing Prisma database schema with PostgreSQL..."
  npx prisma db push --skip-generate || true
fi

# Ensure data and upload directories exist with proper write permissions
mkdir -p /app/data /app/public/uploads

echo "=> Starting Dhakaiya Dripz Next.js Production Server on port ${PORT:-3000}..."
exec "$@"
