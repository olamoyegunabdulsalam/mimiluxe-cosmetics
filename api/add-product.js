import pool from "../lib/db";
import requireAuth from "../lib/requireAuth";

export default async function handler(req, res) {
    const admin = requireAuth(req, res);
    if (!admin) return;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, price, category, description, image } = req.body;

    await pool.query(
        `INSERT INTO products (name, price, category, description, image)
     VALUES ($1,$2,$3,$4,$5)`,
        [ name, price, category, description, image ]
    );

    res.json({ success: true });
}
