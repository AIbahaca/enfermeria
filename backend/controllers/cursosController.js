const db = require("../config/db");

exports.obtenerCursos = (req, res) => {
  db.query("SELECT id_curso, nombre, anio FROM cursos ORDER BY anio, nombre", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};