// api/get-products.js
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Example: fetch products from a database or external API
      const products = [
        {
          id: "1",
          name: "Choco + Bubblegum Lip Gloss",
          category: "gloss",
          price: "5000.00",
          description: "Playful bubblegum pink gloss with a chocolate twist",
          image: "https://mimi-luxe.free.nf/images/combo-1.jpeg",
        },
      ];
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
