import jwt from "jsonwebtoken";

export default function requireAuth(req, res) {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ error: "Not authenticated" });
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // contains admin id + email
    } catch {
        res.status(401).json({ error: "Invalid token" });
        return null;
    }
}
