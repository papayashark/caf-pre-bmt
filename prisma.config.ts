import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
  // --- TOTO PŘIDÁVÁME ---
  // Řekneme Prismě, kde přesně leží tvoje lokální databáze
  datasource: {
    url: process.env.DATABASE_URL, 
  },
});