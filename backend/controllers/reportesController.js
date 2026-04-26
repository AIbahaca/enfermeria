const db = require("../config/db");

// GET estudiantes que tienen al menos 1 atención (para el selector)
exports.obtenerEstudiantesConAtencion = (req, res) => {
  const sql = `
    SELECT DISTINCT e.id_estudiante,
           CONCAT(e.nombre, ' ', IFNULL(e.apellido, '')) AS nombre_completo,
           c.nombre AS nombre_curso
    FROM estudiantes e
    INNER JOIN atenciones a ON e.id_estudiante = a.id_estudiante
    LEFT JOIN cursos c ON e.id_curso = c.id_curso
    ORDER BY e.nombre
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// GET atenciones de un estudiante específico (para generar el reporte)
exports.obtenerReporteEstudiante = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT a.*,
           CONCAT(e.nombre, ' ', IFNULL(e.apellido, '')) AS nombre_estudiante,
           c.nombre AS nombre_curso, c.año
    FROM atenciones a
    LEFT JOIN estudiantes e ON a.id_estudiante = e.id_estudiante
    LEFT JOIN cursos c ON e.id_curso = c.id_curso
    WHERE a.id_estudiante = ?
    ORDER BY a.fecha DESC, a.hora DESC
  `;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// POST guardar reporte generado
exports.crearReporte = (req, res) => {
  const { id_estudiante, tipo, fecha } = req.body;
  if (!id_estudiante || !tipo || !fecha)
    return res.status(400).json({ mensaje: "Faltan datos" });

  db.query(
    "INSERT INTO reportes (id_estudiante, tipo, fecha) VALUES (?, ?, ?)",
    [id_estudiante, tipo, fecha],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: "Reporte guardado", id: result.insertId });
    }
  );
};

// DELETE
exports.eliminarReporte = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM reportes WHERE id_reporte = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Reporte no encontrado" });
    res.json({ mensaje: "Reporte eliminado" });
  });
};