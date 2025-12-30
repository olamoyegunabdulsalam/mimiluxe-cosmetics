import pool from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    const { rows } = await pool.query(
        "SELECT * FROM admins WHERE email=$1",
        [ email ]
    );

    if (!rows.length) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const admin = rows[ 0 ];
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; SameSite=Strict`
    );

    return res.json({ success: true });
}
