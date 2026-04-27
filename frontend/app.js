const API = "https://enfermeria-production-7f39.up.railway.app/api";

// LOGIN
async function login() {
  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ usuario, contraseña })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = data.mensaje;
  }
}