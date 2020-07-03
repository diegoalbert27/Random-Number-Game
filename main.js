class UI {
  // FUNCTION
  mensajeRango(n) {
    const showRango = document.getElementById("showRango");
    formularioA.elements[0].disabled = true;
    document
      .getElementById("container")
      .setAttribute("style", "visibility: visibled;");
    document.getElementById("btnRango").disabled = true;
    showRango.textContent = "Adivina el numero de 1 al " + n;
  }

  mensajeInfo(mensaje, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} text-center`;
    div.innerHTML = `<div class="card-body"><h1>${mensaje}</h1></div>`;
    // MOSTRAR
    const mensajeJuego = document.getElementById("showJuego");
    mensajeJuego.appendChild(div);
    //QUITAR MENSAJE
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  actualizar() {
    setInterval(() => {
      location.reload();
    }, 4000);
  }
}

const formularioA = document.getElementById("formularioA");
const formularioB = document.getElementById("formularioB");

formularioA.addEventListener("submit", e => {
  const rangoNumber = formularioA.elements[0].value;
  const randomNum = Math.floor(Math.random(100) * rangoNumber);
  let jugada;
  console.log(randomNum);
  //UI
  const ui = new UI();
  ui.mensajeRango(rangoNumber);
  switch (rangoNumber) {
    case "100":
      jugada = 10;
      break;
    case "70":
      jugada = 8;
      break;
    case "50":
      jugada = 6;
      break;
    case "20":
      jugada = 4;
      break;
    case "10":
      jugada = 4;
      break;
    default:
      this.ui.mensajeInfo("No hay un valor en el rango", "danger");
  }

  formularioB.addEventListener("submit", e => {
    const adivinarNum = formularioB.elements[0].value;
    const intento = document.getElementById("intento");

    if (adivinarNum === "") {
      ui.mensajeInfo("Adivina El Numero!", "warning");
    } else {
      if (adivinarNum > randomNum) {
        ui.mensajeInfo("Numero Muy Alto", "danger");
        jugada -= 1;
        intento.textContent = "Te queda " + jugada + " Intentos";
        formularioB.reset();
      } else if (adivinarNum < randomNum) {
        ui.mensajeInfo("Numero Muy Bajo", "warning");
        jugada -= 1;
        intento.textContent = "Te quedan " + jugada + " Intentos";
        formularioB.reset();
      } else if (adivinarNum == randomNum) {
        ui.mensajeInfo(`¡Felicidades!<br>El Numero es: ${randomNum}`, "success");
        intento.textContent = "Lo lograste en " + jugada + " Intentos";
        ui.actualizar();
      }
    }
    if (jugada === 0) {
      ui.mensajeInfo(
        `Se Acabaron los intentos :(<br>El Numero era ${randomNum}`,
        "danger"
      );
      ui.actualizar();
    }
    e.preventDefault();
  });
  e.preventDefault();
});
