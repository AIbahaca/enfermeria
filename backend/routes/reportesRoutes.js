const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/reportesController");

router.get("/reportes/estudiantes",       ctrl.obtenerEstudiantesConAtencion);
router.get("/reportes/estudiante/:id",    ctrl.obtenerReporteEstudiante);
router.post("/reportes",                  ctrl.crearReporte);
router.delete("/reportes/:id",            ctrl.eliminarReporte);

module.exports = router;