export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const phpApiUrl = "https://mimi-luxe.free.nf/get-products.php";

  try {
    const response = await fetch(phpApiUrl, {
      headers: {
        "Accept": "application/json",
      },
    });

    const text = await response.text();

    // Check if server returned HTML (host blocked request)
    if (text.includes("<html")) {
      throw new Error("PHP host returned HTML instead of JSON");
    }

    const data = JSON.parse(text);

    // Return JSON to frontend
    res.status(200).json(data);

  } catch (error) {
    console.error("Proxy error:", error);

    // Fallback product if PHP fetch fails
    res.status(200).json([
      {
        id: "8",
        name: "Choco + Bubblegum Lip Gloss",
        category: "gloss",
        price: "5000.00",
        description: "Fallback product",
        image: "https://mimi-luxe.free.nf/images/combo-1.jpeg",
      },
    ]);
  }
}
