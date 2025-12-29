// api/test.js
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ 
    status: "working", 
    message: "API is functioning correctly",
    timestamp: new Date().toISOString()
  });
};
