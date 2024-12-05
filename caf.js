let tiempoUso = 0; 
let tiempoRestante = 0
const costoPorHora = 10;
let intervalo;
let ticketGenerado = false;
let costoTotal = 0;
let contadorComputadora = 1; 

function iniciarSesion() {
    const numeroComputadora = "PC-" + contadorComputadora++;
    const nombreUsuario = document.getElementById('nombre-usuario').value;


    if (!esValido(nombreUsuario)) {
        alert("Por favor, use solo letras en el nombre de usuario.");
        return;
    }

    if (!nombreUsuario) {
        alert("Por favor completa todos los campos.");
        return;
    }


    document.getElementById('numero-computadora').value = numeroComputadora;


    const horas = parseInt(prompt("¿Cuántas horas desea agregar al iniciar sesión?"), 10);
    if (isNaN(horas) || horas < 1) {
        alert("Por favor, ingrese un número válido de horas.");
        return;
    }

    
    document.getElementById('nombre-usuario').value = '';

  
    const ipComputadora = asignarDireccionIP(nombreUsuario);

    tiempoRestante = horas * 3600; 
    tiempoUso = tiempoRestante; 
    costoTotal += calcularCostoConDescuento(horas);
    document.getElementById('tiempo-uso').innerText = formatTiempo(tiempoUso); 

    console.log("Iniciando sesión con los siguientes datos:");
    console.log("Número de Computadora:", numeroComputadora);
    console.log("Dirección IP:", ipComputadora);
    console.log("Nombre de Usuario:", nombreUsuario);
    console.log(`Tiempo de uso configurado: ${horas} horas.`);


    generarTicket(numeroComputadora, ipComputadora, nombreUsuario);

    iniciarContador();
}

function esValido(input) {
    const regex = /^[a-zA-Z]+$/; 
    return regex.test(input);
}

function iniciarContador() {
    intervalo = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            actualizarTiempo();
        } else {
            clearInterval(intervalo); 
            alert("El tiempo ha finalizado.");
            console.log("Sesión finalizada automáticamente debido a que el tiempo se ha agotado.");
        }
    }, 1000); 
}

function actualizarTiempo() {
    document.getElementById('tiempo-uso').innerText = formatTiempo(tiempoRestante); 
}

function formatTiempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${horas}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function generarTicket(numeroComputadora, ipComputadora, nombreUsuario) {
    const ticketDiv = document.getElementById('ticket');
    const ticket = document.createElement('div');

    ticket.innerHTML = `
        <p><strong>Computadora:</strong> ${numeroComputadora}</p>
        <p><strong>Dirección IP:</strong> ${ipComputadora}</p>
        <p><strong>Usuario:</strong> ${nombreUsuario}</p>
        <p><strong>Tiempo de Uso:</strong> <span id="tiempo-uso-ticket">${formatTiempo(tiempoUso)}</span></p>
        <p><strong>Costo Total:</strong> $<span id="costo-actual-ticket">${costoTotal.toFixed(2)}</span></p>
        <p><strong>Costo por Hora:</strong> $<span id="costo-por-hora">${costoPorHora.toFixed(2)}</span></p>
        <button onclick="agregarTiempoAlTicket()">Agregar Tiempo</button> <!-- Opción para agregar tiempo -->
        <button onclick="finalizarSesion()">Finalizar Sesión</button> <!-- Botón para finalizar sesión -->
        <hr>
    `;
    ticketDiv.appendChild(ticket);
    ticketGenerado = true; 
}

function agregarTiempoAlTicket() {
    const horas = parseInt(prompt("¿Cuántas horas desea agregar al ticket?"), 10);
    if (isNaN(horas) || horas < 1) {
        alert("Por favor, ingrese un número válido de horas.");
        return;
    }

    tiempoRestante += horas * 3600; 
    tiempoUso += horas * 3600; 
    costoTotal += calcularCostoConDescuento(horas); 

    actualizarTiempo(); 
    const costoActualElemento = document.getElementById('costo-actual-ticket');
    costoActualElemento.innerText = costoTotal.toFixed(2); 
    const tiempoUsoElemento = document.getElementById('tiempo-uso-ticket');
    tiempoUsoElemento.innerText = formatTiempo(tiempoUso); 

    console.log(`${horas} horas agregadas. Tiempo total: ${tiempoUso / 3600} horas.`);
}

function calcularCostoConDescuento(horas) {
    let costo = horas * costoPorHora;
    
    if (horas === 2) {
        costo *= 0.85; 
    }
    return costo;
}

function finalizarSesion() {
    clearInterval(intervalo); 
    limpiarTicket(); 
    console.log("Sesión finalizada");
}

function limpiarTicket() {
    document.getElementById('ticket').innerHTML = ''; 
    ticketGenerado = false; 
    tiempoUso = 0; 
    tiempoRestante = 0; 
    costoTotal = 0; 
    document.getElementById('tiempo-uso').innerText = "0:00:00"; 
    document.getElementById('costo-actual').innerText = "0.00"; 
    clearInterval(intervalo); 
    console.log("Ticket borrado y cronómetro reiniciado.");
}

function asignarDireccionIP(nombreUsuario) {
    const hash = Array.from(nombreUsuario).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const ultimoOcteto = (hash % 254) + 1; 
    return `192.168.6.${ultimoOcteto}`;
}

window.onload = () => {
    document.getElementById('ip-computadora').value = asignarDireccionIP("UsuarioEjemplo"); 
};
