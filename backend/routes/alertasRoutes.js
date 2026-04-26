const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/alertasController");

router.get("/alertas",        ctrl.obtenerAlertas);
router.delete("/alertas/:id", ctrl.eliminarAlerta);

module.exports = router;