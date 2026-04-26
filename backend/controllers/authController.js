const db = require("../config/db");

exports.login = (req, res) => {
  const { usuario, contraseña } = req.body;

  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";

  db.query(sql, [usuario, contraseña], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en servidor" });
    }

    if (result.length > 0) {
      res.json({ mensaje: "Login correcto" });
    } else {
      res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
  });
};