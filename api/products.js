// api/products.js - SIMPLE WORKING VERSION
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  
  // Return hardcoded products - THIS WILL WORK
  const products = [
    {
      id: "8",
      name: "Choco + Bubblegum Lip Gloss",
      category: "gloss",
      price: "5000.00",
      description: "Playful bubblegum pink gloss with a chocolate twist for soft glam and sweet shine",
      image: "https://mimi-luxe.free.nf/images/combo-1.jpeg"
    },
    {
      id: "7",
      name: "Choco + Hot Pink Lip Gloss",
      category: "gloss",
      price: "5000.00",
      description: "Bold hot pink gloss blended with chocolate for statement shine and confident beauty",
      image: "https://mimi-luxe.free.nf/images/combo-2.jpeg"
    },
    {
      id: "1",
      name: "Lip Oil",
      category: "oil",
      price: "1500.00",
      description: "A nourishing lip oil that hydrates deeply while giving your lips a natural, glossy shine",
      image: "https://mimi-luxe.free.nf/images/lip-oil.jpeg"
    },
    {
      id: "2",
      name: "Lip Mask",
      category: "masks",
      price: "500.00",
      description: "An overnight lip mask that repairs, softens, and restores dry lips for a smooth finish.",
      image: "https://mimi-luxe.free.nf/images/lip-mask.jpeg"
    },
    {
      id: "3",
      name: "Lip Mask",
      category: "masks",
      price: "500.00",
      description: "Richly formulated to lock in moisture and leave your lips plump, soft, and refreshed",
      image: "https://mimi-luxe.free.nf/images/lip-mask-2.jpeg"
    }
  ];
  
  res.status(200).json(products);
};
