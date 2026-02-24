import { neon } from '@neondatabase/serverless';

const getSql = () => {
    const url = process.env.DATABASE_URL;
    if (!url) {
        // Return a dummy function or throw error only when called, not during build evaluation
        return ((...args: any[]) => {
            throw new Error("DATABASE_URL is not defined. Please connect your Neon database in Vercel path: Storage -> Connect.");
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
