import { PrismaClient } from '@generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = `${process.env.DATABASE_URL}`;

// Konfigurasi connection pool
const pool = new Pool({
  connectionString,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 60000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout after 2s
});

const adapter = new PrismaPg(pool);
console.log('STATUS ENV SAAT INI:', '🔥🔥', process.env.NODE_ENV);
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export { prisma };
