const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/medicamentosController");

router.get("/medicamentos",        ctrl.obtenerMedicamentos);
router.post("/medicamentos",       ctrl.crearMedicamento);
router.put("/medicamentos/:id",    ctrl.actualizarMedicamento);
router.delete("/medicamentos/:id", ctrl.eliminarMedicamento);

module.exports = router;