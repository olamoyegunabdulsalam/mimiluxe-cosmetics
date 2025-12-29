// api/products.js - USE THIS VERSION
const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'sql102.infinityfree.com',
            user: process.env.DB_USER || 'if0_40782407',
            password: process.env.DB_PASSWORD || 'MariamTanimomo',
            database: process.env.DB_NAME || 'if0_40782407_mimiluxe',
            port: process.env.DB_PORT || 3306,
        });

        const [ rows ] = await connection.execute(
            'SELECT * FROM products ORDER BY id DESC'
        );
        await connection.end();

        const products = rows.map(product => ({
            ...product,
            image: product.image
                ? `https://mimi-luxe.free.nf/images/${product.image.split('/').pop()}`
                : ''
        }));

        res.status(200).json(products);
    } catch (error) {
        console.error('Database error:', error);

        // Fallback data
        const fallbackProducts = [
            {
                id: "8",
                name: "Choco + Bubblegum Lip Gloss",
                category: "gloss",
                price: "5000.00",
                description: "Playful bubblegum pink gloss with a chocolate twist",
                image: "https://mimi-luxe.free.nf/images/combo-1.jpeg"
            },
            {
                id: "7",
                name: "Choco + Hot Pink Lip Gloss",
                category: "gloss",
                price: "5000.00",
                description: "Bold hot pink gloss blended with chocolate",
                image: "https://mimi-luxe.free.nf/images/combo-2.jpeg"
            }
        ];

        res.status(200).json({
            products: fallbackProducts,
            note: "Using fallback data - Database connection failed",
            error: error.message
        });
    }
};