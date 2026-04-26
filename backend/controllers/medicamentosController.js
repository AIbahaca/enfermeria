const db = require("../config/db");

exports.obtenerMedicamentos = (req, res) => {
  db.query("SELECT * FROM medicamentos ORDER BY nombre", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.crearMedicamento = (req, res) => {
  const { nombre, uso, tipo, stock } = req.body;
  if (!nombre) return res.status(400).json({ mensaje: "El nombre es obligatorio" });

  db.query(
    "INSERT INTO medicamentos (nombre, uso, tipo, stock) VALUES (?, ?, ?, ?)",
    [nombre, uso || null, tipo || null, stock || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: "Medicamento creado", id: result.insertId });
    }
  );
};

exports.actualizarMedicamento = (req, res) => {
  const { id } = req.params;
  const { nombre, uso, tipo, stock } = req.body;

  db.query(
    "UPDATE medicamentos SET nombre=?, uso=?, tipo=?, stock=? WHERE id_medicamento=?",
    [nombre, uso, tipo, stock, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ mensaje: "No encontrado" });
      res.json({ mensaje: "Medicamento actualizado" });
    }
  );
};

exports.eliminarMedicamento = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM medicamentos WHERE id_medicamento=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Medicamento eliminado" });
  });
};