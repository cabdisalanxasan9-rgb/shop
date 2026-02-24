import { neon } from '@neondatabase/serverless';

const getSql = () => {
    // Vercel set the prefix to STORAGE, so it will be STORAGE_URL
    const url = process.env.STORAGE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!url) {
        return ((...args: any[]) => {
            throw new Error("Database connection not found. Please click 'Connect' in Vercel Storage settings.");
        }) as any;
    }
    return neon(url);
};

const sql = getSql();

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
