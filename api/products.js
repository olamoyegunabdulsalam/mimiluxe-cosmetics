// api/products.js - Works without InfinityFree MySQL
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  
  try {
    // Try to fetch from your PHP API first
    console.log("Trying PHP API...");
    
    // Use node-fetch if needed, or try different approach
    const https = require("https");
    
    const data = await new Promise((resolve, reject) => {
      https.get("https://mimi-luxe.free.nf/get-products.json", (resp) => {
        let data = "";
        resp.on("data", chunk => data += chunk);
        resp.on("end", () => {
          try {
            if (data.includes("<html>")) {
              reject(new Error("Hosting blocked PHP API"));
            } else {
              resolve(JSON.parse(data));
            }
          } catch (e) {
            reject(e);
          }
        });
      }).on("error", reject);
    });
    
    res.json(data);
    
  } catch (phpError) {
    console.error("PHP API failed:", phpError.message);
    
    // Return hardcoded data
    const products = [
      {
        id: "8",
        name: "Choco + Bubblegum Lip Gloss",
        category: "gloss",
        price: "5000.00",
        description: "Playful bubblegum pink gloss with a chocolate twist for soft glam and sweet shine",
        image: "https://mimi-luxe.free.nf/images/combo-1.jpeg",
        created_at: "2025-12-27 05:28:24",
        updated_at: "2025-12-28 13:13:40"
      },
      {
        id: "7",
        name: "Choco + Hot Pink Lip Gloss",
        category: "gloss",
        price: "5000.00",
        description: "Bold hot pink gloss blended with chocolate for statement shine and confident beauty",
        image: "https://mimi-luxe.free.nf/images/combo-2.jpeg",
        created_at: "2025-12-27 05:28:24",
        updated_at: "2025-12-28 13:13:40"
      },
      {
        id: "1",
        name: "Lip Oil",
        category: "oil",
        price: "1500.00",
        description: "A nourishing lip oil that hydrates deeply while giving your lips a natural, glossy shine",
        image: "https://mimi-luxe.free.nf/images/lip-oil.jpeg",
        created_at: "2025-12-27 05:28:24",
        updated_at: "2025-12-28 13:13:40"
      }
    ];
    
    res.json(products);
  }
};
