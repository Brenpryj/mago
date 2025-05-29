let puntaje = 0;
let nivel = 1;

const hechizos = {
  habemus: "habemus",
  fuego: "fuego"
};

function lanzarHechizo(magoColor, event) {
  const hechizoIngresado = document.getElementById("hechizo").value.toLowerCase().trim();
  const clave = hechizoIngresado;

  if (!hechizos[hechizoIngresado]) {
    mostrarMensaje("⚠️ Ese hechizo no es válido. Usa: habemus o fuego.");
    return;
  }

  if (clave !== hechizoIngresado) {
    mostrarMensaje("❌ Clave incorrecta.");
    return;
  }

  const varita = document.getElementById(`varita${capitalize(magoColor)}`);
  const mago = document.getElementById(`mago${capitalize(magoColor)}`);
  const boton = event?.target;

  mago.classList.add("lanzando");
  setTimeout(() => {
    mago.classList.remove("lanzando");
  }, 300);

  varita.style.animation = "hechizo 0.6s ease-out";
  setTimeout(() => {
    varita.style.animation = "";
  }, 600);

  if (boton) {
    boton.classList.add("activado");
    setTimeout(() => {
      boton.classList.remove("activado");
    }, 400);
  }

  mostrarMensaje(`✨ ¡El mago ${magoColor} lanzó '${hechizoIngresado}' con éxito!`);
  reproducirSonido();

  if (hechizoIngresado === "fuego") {
    lanzarFuegoDesde(varita);
  }

  puntaje += 10;
  document.getElementById("puntaje").textContent = puntaje;

  if (puntaje >= 100) {
    mostrarVictoria();
    return;
  }

  if (puntaje % 30 === 0) {
    nivel++;
    document.getElementById("nivel").textContent = nivel;
    mostrarMensaje(`🎉 ¡Subiste al nivel ${nivel}!`);
  }

  document.getElementById("hechizo").value = "";
}

function mostrarMensaje(msg) {
  document.getElementById("mensaje").textContent = msg;
}

function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function lanzarFuegoDesde(varita) {
  const fuego = document.createElement("div");
  fuego.className = "fuego";
  varita.appendChild(fuego);
  setTimeout(() => {
    fuego.remove();
  }, 800);
}

function reproducirSonido() {
  const sonido = document.getElementById("sonidoHechizo");
  sonido.currentTime = 0;
  sonido.play();
}

function mostrarVictoria() {
  document.getElementById("pantallaVictoria").style.display = "flex";
  document.getElementById("puntajeFinal").textContent = puntaje;
}

function reiniciarJuego() {
  location.reload();
}
