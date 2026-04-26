const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/cursosController");

router.get("/cursos", ctrl.obtenerCursos);

module.exports = router;