import jwt from "jsonwebtoken";

export default function handler(req, res) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ authenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ authenticated: true, user: decoded });
    } catch {
        return res.status(401).json({ authenticated: false });
    }
}
