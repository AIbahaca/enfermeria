const db = require("../config/db");

// GET todas las atenciones con nombre y apellido del estudiante
exports.obtenerAtenciones = (req, res) => {
  const sql = `
    SELECT a.*, 
          CONCAT(e.nombre, ' ', IFNULL(e.apellido, '')) AS nombre_estudiante,
          c.nombre AS nombre_curso
    FROM atenciones a
    LEFT JOIN estudiantes e ON a.id_estudiante = e.id_estudiante
    LEFT JOIN cursos c ON e.id_curso = c.id_curso
    ORDER BY a.fecha DESC, a.hora DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// POST crear atención
exports.crearAtencion = (req, res) => {
  const { id_estudiante, fecha, hora, sintomas, diagnostico, accion, id_usuario } = req.body;

  if (!id_estudiante || !fecha) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  const sql = `
    INSERT INTO atenciones (id_estudiante, fecha, hora, sintomas, diagnostico, accion, id_usuario)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [id_estudiante, fecha, hora || null, sintomas || null, diagnostico || null, accion || null, id_usuario || null], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Verificar si corresponde generar alerta automática (3+ atenciones en 7 días)
    const sqlCheck = `
      SELECT COUNT(*) AS total FROM atenciones
      WHERE id_estudiante = ?
        AND fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    `;
    db.query(sqlCheck, [id_estudiante], (err2, rows) => {
      if (!err2 && rows[0].total >= 3) {
        const sqlAlerta = `
          INSERT INTO alertas (id_estudiante, tipo, descripcion, fecha)
          VALUES (?, 'Visita repetitiva', ?, CURDATE())
        `;
        const desc = `El estudiante tiene ${rows[0].total} atenciones en los últimos 7 días.`;
        db.query(sqlAlerta, [id_estudiante, desc], () => {});
      }
    });

    res.json({ mensaje: "Atención registrada correctamente", id: result.insertId });
  });
};

// DELETE
exports.eliminarAtencion = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM atenciones WHERE id_atencion = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Atención no encontrada" });
    res.json({ mensaje: "Atención eliminada" });
  });
};