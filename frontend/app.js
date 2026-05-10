// =============================================
//  Configuración de la API
// =============================================
const API = "http://localhost:3000/api";

// ── TOKEN ──
function getToken() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try { return JSON.parse(user).token || null; } catch { return null; }
}

// ── LOGIN ──
async function login() {
  const msg      = document.getElementById("msg");
  const usuario  = document.getElementById("usuario").value.trim();
  const contraseña = document.getElementById("contraseña").value;

  if (!usuario || !contraseña) {
    msg.textContent = "Por favor ingresa usuario y contraseña.";
    return;
  }

  try {
    const res = await fetch(API + "/login", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ usuario, contraseña })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "dashboard.html";
    } else {
      msg.textContent = "❌ " + data.mensaje;
    }
  } catch (err) {
    msg.textContent = "❌ No se pudo conectar con el servidor. Verifica que el backend esté corriendo.";
    console.error(err);
  }
}

// ── PROTEGER PÁGINAS ──
async function requireLogin() {
  const user = localStorage.getItem("user");
  if (!user) { window.location.href = "login.html"; return; }

  try {
    const res = await fetch(API + "/verificar", {
      headers: { "Authorization": "Bearer " + getToken() }
    });
    if (!res.ok) {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    }
  } catch {
    // Backend no disponible — dejar pasar
  }
}

// ── FETCH CON TOKEN AUTOMÁTICO ──
// Reemplaza fetch(API + "/ruta") por apiFetch("/ruta") en cualquier página
async function apiFetch(url, options = {}) {
  options.headers = {
    "Content-Type":  "application/json",
    "Authorization": "Bearer " + getToken(),
    ...(options.headers || {})
  };

  const res = await fetch(API + url, options);

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("user");
    window.location.href = "login.html";
    return null;
  }

  return res;
}

// ── MOSTRAR USUARIO EN SIDEBAR ──
function mostrarUsuario() {
  const raw = localStorage.getItem("user");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    const u = data.usuario;
    const nameEl = document.querySelector(".sidebar-user-info .name");
    const roleEl = document.querySelector(".sidebar-user-info .role-badge");
    if (nameEl && u) nameEl.textContent = u.nombre || u.usuario || "Enfermera";
    if (roleEl && u) roleEl.textContent  = u.cargo  || "Enfermero/a";
  } catch {}
}

document.addEventListener("DOMContentLoaded", mostrarUsuario);
