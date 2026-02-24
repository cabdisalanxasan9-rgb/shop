import { neon } from '@neondatabase/serverless';

// Neon automatically uses DATABASE_URL env variable set by Vercel
const sql = neon(process.env.DATABASE_URL!);

// Create users table if it doesn't exist
export async function initDB() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id          SERIAL PRIMARY KEY,
            name        VARCHAR(100) NOT NULL,
            email       VARCHAR(255) UNIQUE NOT NULL,
            password    VARCHAR(255) NOT NULL,
            phone       VARCHAR(50) DEFAULT '',
            avatar      TEXT DEFAULT '',
            created_at  TIMESTAMP DEFAULT NOW()
        )
    `;
}

export { sql };
