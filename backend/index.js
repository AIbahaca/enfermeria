const express        = require("express");
const cors           = require("cors");
const verificarToken = require("./middleware/auth");

require("./config/db");

const app = express();

// Permitir peticiones desde GitHub Pages y localhost
app.use(cors({
  origin: [
    "https://aibahaca.github.io",
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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