const express = require("express");
const cors = require("cors");

require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const estudiantesRoutes = require("./routes/estudiantesRoutes");
app.use("/api", estudiantesRoutes);

const atencionesRoutes = require("./routes/atencionesRoutes");
app.use("/api", atencionesRoutes);

const alertasRoutes = require("./routes/alertasRoutes");
app.use("/api", alertasRoutes);

const medicamentosRoutes = require("./routes/medicamentosRoutes");
app.use("/api", medicamentosRoutes);

const reportesRoutes = require("./routes/reportesRoutes");
app.use("/api", reportesRoutes);

const cursosRoutes = require("./routes/cursosRoutes");
app.use("/api", cursosRoutes);

app.get("/", (req, res) => {
  res.send("API Enfermería funcionando");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});