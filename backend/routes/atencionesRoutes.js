const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/atencionesController");

router.get("/atenciones",        ctrl.obtenerAtenciones);
router.post("/atenciones",       ctrl.crearAtencion);
router.delete("/atenciones/:id", ctrl.eliminarAtencion);

module.exports = router;