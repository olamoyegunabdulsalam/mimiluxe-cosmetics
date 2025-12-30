// api/delete-product.js
import pool from "../lib/db";
import requireAuth from "../lib/requireAuth";

export default async function handler(req, res) {
    const admin = requireAuth(req, res);
    if (!admin) return;

    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id } = req.body; // Get from body, not query

    try {
        await pool.query("DELETE FROM products WHERE id=$1", [ id ]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}