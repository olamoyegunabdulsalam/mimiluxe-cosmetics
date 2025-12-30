import fs from "fs";
import path from "path";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(
            path.join(process.cwd(), "prod-ca-2021.crt")
        ).toString(),
    },
});

export default pool;
