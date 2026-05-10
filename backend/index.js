const express        = require("express");
const cors           = require("cors");
const verificarToken = require("./middleware/auth");

require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta pública — solo login
app.use("/api", require("./routes/authRoutes"));

// Rutas protegidas — requieren token JWT
app.use("/api", verificarToken, require("./routes/estudiantesRoutes"));
app.use("/api", verificarToken, require("./routes/atencionesRoutes"));
app.use("/api", verificarToken, require("./routes/alertasRoutes"));
app.use("/api", verificarToken, require("./routes/medicamentosRoutes"));
app.use("/api", verificarToken, require("./routes/reportesRoutes"));
app.use("/api", verificarToken, require("./routes/cursosRoutes"));

app.get("/", (req, res) => {
  res.send("✅ API Enfermería funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto " + PORT);
});
