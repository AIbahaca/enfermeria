const mysql = require("mysql2");

const db = mysql.createConnection({
  host: 'shortline.proxy.rlwy.net',
  user: 'root',
  password: 'FgAucECfHfykyYnnDNCaqHQWaVMtEPGw',
  database: 'railway',
  port: 28651
});

db.connect(err => {
  if (err) {
    console.error("❌ Error de conexión:", err);
    return;
  }
  console.log("✅ Conectado a MySQL (Railway)");
});

module.exports = db;