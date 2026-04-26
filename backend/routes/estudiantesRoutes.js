const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/estudiantesController");

router.get("/estudiantes",        ctrl.obtenerEstudiantes);
router.post("/estudiantes",       ctrl.crearEstudiante);
router.put("/estudiantes/:id",    ctrl.actualizarEstudiante);
router.delete("/estudiantes/:id", ctrl.eliminarEstudiante);

module.exports = router;