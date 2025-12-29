// api/products.js - CommonJS
const mysql = require("mysql2/promise");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  
  try {
    console.log("Connecting to DB...");
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "sql102.infinityfree.com",
      user: process.env.DB_USER || "if0_40782407",
      password: process.env.DB_PASSWORD || "MariamTanimomo",
      database: process.env.DB_NAME || "if0_40782407_mimiluxe",
      port: process.env.DB_PORT || 3306,
    });

    const [rows] = await connection.execute("SELECT * FROM products");
    await connection.end();
    
    console.log("Fetched", rows.length, "products");
    
    const products = rows.map(p => ({
      ...p,
      image: p.image 
        ? \`https://mimi-luxe.free.nf/images/\${p.image.split("/").pop()}\`
        : ""
    }));
    
    res.status(200).json(products);
    
  } catch (error) {
    console.error("Database error:", error.message);
    
    // Fallback
    const fallback = [
      {
        id: "8",
        name: "Choco + Bubblegum Lip Gloss",
        category: "gloss",
        price: "5000.00",
        description: "Playful bubblegum pink gloss with a chocolate twist",
        image: "https://mimi-luxe.free.nf/images/combo-1.jpeg"
      }
    ];
    
    res.status(200).json(fallback);
  }
};
