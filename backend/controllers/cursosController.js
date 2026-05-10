const db = require("../config/db");

exports.obtenerCursos = (req, res) => {
  db.query("SELECT id_curso, nombre, anio FROM cursos ORDER BY anio, nombre", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.crearCurso = (req, res) => {
  const { nombre, anio } = req.body;
  if (!nombre) return res.status(400).json({ mensaje: "El nombre es obligatorio" });
  db.query(
    "INSERT INTO cursos (nombre, anio) VALUES (?, ?)",
    [nombre, anio || new Date().getFullYear()],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: "Curso creado correctamente", id: result.insertId });
    }
  );
};

exports.eliminarCurso = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cursos WHERE id_curso = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Curso no encontrado" });
    res.json({ mensaje: "Curso eliminado" });
  });
};
