import pool from "../lib/db";
import requireAuth from "../lib/requireAuth";

export default async function handler(req, res) {
    const admin = requireAuth(req, res);
    if (!admin) return;

    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id, name, price, category, description, image } = req.body;

    await pool.query(
        `UPDATE products
     SET name=$1, price=$2, category=$3, description=$4, image=$5
     WHERE id=$6`,
        [ name, price, category, description, image, id ]
    );

    res.json({ success: true });
}
