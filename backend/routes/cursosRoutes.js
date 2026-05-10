const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/cursosController");

router.get("/cursos",     ctrl.obtenerCursos);
router.post("/cursos",    ctrl.crearCurso);
router.delete("/cursos/:id", ctrl.eliminarCurso);

module.exports = router;
