const express        = require("express");
const cors           = require("cors");
const verificarToken = require("./middleware/auth");

require("./config/db");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", cors());
app.use(express.json());

// Rutas públicas
app.use("/api", require("./routes/authRoutes"));

// Rutas protegidas
app.use("/api", verificarToken, require("./routes/estudiantesRoutes"));
app.use("/api", verificarToken, require("./routes/atencionesRoutes"));
app.use("/api", verificarToken, require("./routes/alertasRoutes"));
app.use("/api", verificarToken, require("./routes/medicamentosRoutes"));
app.use("/api", verificarToken, require("./routes/reportesRoutes"));
app.use("/api", verificarToken, require("./routes/cursosRoutes"));

app.get("/", (req, res) => res.send("✅ API Enfermería funcionando"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Servidor en puerto " + PORT));
