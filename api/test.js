import mysql from "mysql2/promise";

export default async function handler(req, res) {    
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });

    const [rows] = await connection.execute("SELECT 1 as test");
    await connection.end();

    res.status(200).json({
      success: true,
      message: "Database connected successfully",
      env: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        password_set: !!process.env.DB_PASSWORD
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      env_check: {
        DB_HOST: process.env.DB_HOST || "missing",
        DB_USER: process.env.DB_USER || "missing",
        DB_NAME: process.env.DB_NAME || "missing",
        DB_PORT: process.env.DB_PORT || "missing",
        DB_PASSWORD: process.env.DB_PASSWORD ? "set" : "missing"
      }
    });
  }
}
