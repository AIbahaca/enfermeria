const db = require("../config/db");

// GET alertas — solo estudiantes que ya tienen atenciones
exports.obtenerAlertas = (req, res) => {
  const sql = `
    SELECT al.*,
           CONCAT(e.nombre, ' ', IFNULL(e.apellido, '')) AS nombre_estudiante,
           c.nombre AS nombre_curso
    FROM alertas al
    LEFT JOIN estudiantes e ON al.id_estudiante = e.id_estudiante
    LEFT JOIN cursos c ON e.id_curso = c.id_curso
    ORDER BY al.fecha DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// DELETE alerta
exports.eliminarAlerta = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM alertas WHERE id_alerta = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Alerta no encontrada" });
    res.json({ mensaje: "Alerta eliminada" });
  });
};