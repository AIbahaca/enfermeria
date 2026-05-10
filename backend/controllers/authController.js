const db     = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "salud_escolar_secret_2025";

exports.login = (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: "Usuario y contraseña son requeridos" });
  }

  const sql = "SELECT * FROM usuarios WHERE usuario = ?";

  db.query(sql, [usuario], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error en el servidor" });
    }

    if (result.length === 0) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const user = result[0];
    let passwordValida = false;

    if (user.contraseña.startsWith("$2")) {
      // Ya está encriptada con bcrypt
      passwordValida = await bcrypt.compare(contraseña, user.contraseña);
    } else {
      // Texto plano — migración automática
      passwordValida = (contraseña === user.contraseña);
      if (passwordValida) {
        const hash = await bcrypt.hash(contraseña, 10);
        db.query("UPDATE usuarios SET contraseña = ? WHERE id = ?", [hash, user.id]);
        console.log(`✅ Contraseña de "${usuario}" migrada a bcrypt`);
      }
    }

    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user.id, usuario: user.usuario, cargo: user.cargo },
      SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      mensaje: "Login correcto",
      token,
      usuario: {
        id:      user.id,
        nombre:  user.nombre,
        usuario: user.usuario,
        cargo:   user.cargo
      }
    });
  });
};

exports.verificar = (req, res) => {
  res.json({ valido: true, usuario: req.usuario });
};
