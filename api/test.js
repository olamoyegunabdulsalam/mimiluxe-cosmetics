// api/test.js - CommonJS
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ message: 'API test working', timestamp: new Date().toISOString() });
};
