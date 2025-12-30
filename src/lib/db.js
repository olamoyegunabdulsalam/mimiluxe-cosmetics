// ...existing code...
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caPath = path.join(__dirname, "../prod-ca-2021.crt");

let ca;
try {
    ca = fs.readFileSync(caPath, "utf8");
} catch (err) {
    throw new Error(`Failed to read CA file at ${caPath}: ${err.message}`);
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: true,
        ca: ca, // or [ca]
    },
});

export default pool;
// ...existing code...