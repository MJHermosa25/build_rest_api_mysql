import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",  // Default in XAMPP
  password: "",  // Default in XAMPP
  database: "node_project",
});

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1+1 AS result");
    console.log("✅ Database Connected Successfully:", rows);
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  }
}

testConnection();
