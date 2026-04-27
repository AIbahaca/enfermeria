const db = require("../config/db");

// GET — filtra por curso si se pasa ?id_curso=X
exports.obtenerEstudiantes = (req, res) => {
  const { id_curso } = req.query;
  let sql = `
    SELECT e.id_estudiante, e.nombre, e.apellido, e.edad, e.contacto_emergencia,
           c.id_curso, c.nombre AS nombre_curso, c.anio
    FROM estudiantes e
    LEFT JOIN cursos c ON e.id_curso = c.id_curso
  `;
  const params = [];
  if (id_curso) {
    sql += " WHERE e.id_curso = ?";
    params.push(id_curso);
  }
  sql += " ORDER BY e.nombre";
  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// POST — crea estudiante asignado a un curso
exports.crearEstudiante = (req, res) => {
  const { nombre, apellido, edad, id_curso, contacto_emergencia } = req.body;
  if (!nombre) return res.status(400).json({ mensaje: "El nombre es obligatorio" });
  db.query(
    "INSERT INTO estudiantes (nombre, apellido, edad, id_curso, contacto_emergencia) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido || null, edad || null, id_curso || null, contacto_emergencia || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: "Estudiante creado correctamente", id: result.insertId });
    }
  );
};

// PUT
exports.actualizarEstudiante = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, edad, id_curso, contacto_emergencia } = req.body;
  db.query(
    "UPDATE estudiantes SET nombre=?, apellido=?, edad=?, id_curso=?, contacto_emergencia=? WHERE id_estudiante=?",
    [nombre, apellido || null, edad || null, id_curso || null, contacto_emergencia || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Estudiante no encontrado" });
      res.json({ mensaje: "Estudiante actualizado" });
    }
  );
};

// DELETE
exports.eliminarEstudiante = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM estudiantes WHERE id_estudiante=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    res.json({ mensaje: "Estudiante eliminado" });
  });
};