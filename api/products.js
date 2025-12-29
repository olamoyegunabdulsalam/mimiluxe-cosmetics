import mysql from "mysql2/promise";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });

    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE deleted_at IS NULL ORDER BY id DESC"
    );
    await connection.end();
    
    const products = rows.map(product => ({
      ...product,
      image: product.image 
        ? `https://mimi-luxe.free.nf/images/${product.image.split("/").pop()}`
        : ""
    }));
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed", message: error.message });
  }
}
