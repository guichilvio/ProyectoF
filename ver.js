
function calcularPrecioKilo(costoUnidad) {
    return costoUnidad * 1.5 *6;
}


const productosFrutas = [
    { nombre: 'Manzana', origen: 'Árbol', familia: 'Rosáceas', costoUnidad: 1.5, precioKilo: calcularPrecioKilo(1.5), descripcion: 'Manzana Roja', imagen: 'manzana.png' },
    { nombre: 'Plátano', origen: 'Planta', familia: 'Musáceas', costoUnidad: 1.4, precioKilo: calcularPrecioKilo(1.4), descripcion: 'Plátano Maduro', imagen: 'platanos.png' },
    { nombre: 'Naranja', origen: 'Árbol', familia: 'Rutáceas', costoUnidad: 1.0, precioKilo: calcularPrecioKilo(1.0), descripcion: 'Naranja de Mesa', imagen: 'naranja.png' },
    { nombre: 'Fresa', origen: 'Planta', familia: 'Rosáceas', costoUnidad: 2.0, precioKilo: calcularPrecioKilo(2.0), descripcion: 'Fresa Fresca', imagen: 'fresa.png' },
    { nombre: 'Mango', origen: 'Árbol', familia: 'Anacardiáceas', costoUnidad: 1.8, precioKilo: calcularPrecioKilo(1.8), descripcion: 'Mango Dulce', imagen: 'mango.png' },
    { nombre: 'Piña', origen: 'Planta', familia: 'Bromeliáceas', costoUnidad: 2.2, precioKilo: calcularPrecioKilo(2.2), descripcion: 'Piña Tropical', imagen: 'pina.png' },
    { nombre: 'Uva', origen: 'Planta', familia: 'Vitáceas', costoUnidad: 2.5, precioKilo: calcularPrecioKilo(2.5), descripcion: 'Uva Verde', imagen: 'uva.png' },
    { nombre: 'Papaya', origen: 'Planta', familia: 'Caricáceas', costoUnidad: 1.6, precioKilo: calcularPrecioKilo(1.6), descripcion: 'Papaya Tropical', imagen: 'papaya.png' },
    { nombre: 'Sandía', origen: 'Planta', familia: 'Cucurbitáceas', costoUnidad: 1.2, precioKilo: calcularPrecioKilo(1.2), descripcion: 'Sandía Fresca', imagen: 'sandia.png' },
    { nombre: 'Cereza', origen: 'Árbol', familia: 'Rosáceas', costoUnidad: 3.0, precioKilo: calcularPrecioKilo(3.0), descripcion: 'Cereza Roja', imagen: 'cerezas.png' },
    { nombre: 'Melón', origen: 'Planta', familia: 'Cucurbitáceas', costoUnidad: 1.5, precioKilo: calcularPrecioKilo(1.5), descripcion: 'Melón Dulce', imagen: 'melon.png' },
    { nombre: 'Durazno', origen: 'Árbol', familia: 'Rosáceas', costoUnidad: 1.7, precioKilo: calcularPrecioKilo(1.7), descripcion: 'Durazno Jugoso', imagen: 'melocoton.png' },
];


const productosVerduras = [
    { nombre: 'Pepino', origen: 'Planta', familia: 'Cucurbitáceas', costoUnidad: 0.9, precioKilo: calcularPrecioKilo(0.9), descripcion: 'Pepino Verde', imagen: 'pepino.png' },
    { nombre: 'Tomate', origen: 'Planta', familia: 'Solanáceas', costoUnidad: 1.2, precioKilo: calcularPrecioKilo(1.2), descripcion: 'Tomate Rojo', imagen: 'tomate.png' },
    { nombre: 'Zanahoria', origen: 'Tierra', familia: 'Apiáceas', costoUnidad: 1.0, precioKilo: calcularPrecioKilo(1.0), descripcion: 'Zanahoria Fresca', imagen: 'zanahoria.png' },
    { nombre: 'Pimiento', origen: 'Planta', familia: 'Solanáceas', costoUnidad: 1.3, precioKilo: calcularPrecioKilo(1.3), descripcion: 'Pimiento Rojo', imagen: 'pimiento-rojo.png' },
    { nombre: 'Calabacín', origen: 'Planta', familia: 'Cucurbitáceas', costoUnidad: 1.1, precioKilo: calcularPrecioKilo(1.1), descripcion: 'Calabacín Fresco', imagen: 'calabacin.png' },
    { nombre: 'Brócoli', origen: 'Planta', familia: 'Brassicáceas', costoUnidad: 1.5, precioKilo: calcularPrecioKilo(1.5), descripcion: 'Brócoli Fresco', imagen: 'brocoli.png' },
   
];

let productosSeleccionados = [];


function cargarProductos(categoria) {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';

    const productos = categoria === 'frutas' ? productosFrutas : productosVerduras;

    productos.forEach((producto) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="producto" onclick="seleccionarProducto('${producto.nombre}', '${producto.descripcion}', '${producto.origen}', ${producto.costoUnidad}, '${categoria}', ${producto.precioKilo}, '${producto.familia}')">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio por kilo: $${producto.precioKilo.toFixed(2)}</p>
                <p>${producto.descripcion}</p>
            </div>
        `;
        productosGrid.appendChild(div);
    });
}


function seleccionarProducto(nombre, descripcion, origen, costo, tipoCompra, precioKilo, familia) {
    const cantidadSeleccionada = document.querySelector('input[name="cantidad"]:checked');

    if (!cantidadSeleccionada) {
        alert('Por favor, selecciona una unidad de medida (unidad o kilo)');
        return;
    }

    const tipoCantidad = cantidadSeleccionada.value; 
    let precioTotal;

    if (tipoCantidad === 'kilo') {
        precioTotal = precioKilo; 
    } else {
        precioTotal = costo; 
    }

   
    const productoExistente = productosSeleccionados.find((producto) => producto.nombre === nombre && producto.tipoCompra === tipoCantidad);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        productoExistente.precioTotal += precioTotal;
    } else {
        productosSeleccionados.push({
            nombre,
            tipoCompra: tipoCantidad,
            cantidad: 1,
            precioUnidad: precioTotal,
            precioTotal: precioTotal,
            familia: familia,
            origen: origen
        });
    }

   
    document.getElementById('familia').value = familia;
    document.getElementById('tipo').value = origen;

    mostrarTicket();
}


function mostrarTicket() {
    const ticketDiv = document.getElementById('ticket');
    ticketDiv.innerHTML = '';

    productosSeleccionados.forEach((producto) => {
        ticketDiv.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p>${producto.cantidad} x ${producto.nombre} (${producto.tipoCompra}) - $${producto.precioTotal.toFixed(2)}</p>
                <button onclick="quitarUnidad('${producto.nombre}', '${producto.tipoCompra}')">Quitar unidad</button>
            </div>
        `;
    });

    
    const totalGeneral = productosSeleccionados.reduce((sum, producto) => sum + producto.precioTotal, 0);
    ticketDiv.innerHTML += `<strong>Total: $${totalGeneral.toFixed(2)}</strong>`;
}


function quitarUnidad(nombre, tipoCompra) {
    const productoExistente = productosSeleccionados.find(producto => producto.nombre === nombre && producto.tipoCompra === tipoCompra);

    if (!productoExistente) {
        alert("Producto no encontrado en el ticket.");
        return;
    }

    if (productoExistente.cantidad > 1) {
        productoExistente.cantidad -= 1; 
        const precioPorUnidad = productoExistente.tipoCompra === 'kilo' ? productoExistente.precioUnidad : productoExistente.precioUnidad; // Asignar precio correspondiente
        productoExistente.precioTotal -= precioPorUnidad;
    } else {
       
        productosSeleccionados = productosSeleccionados.filter(producto => producto !== productoExistente);
    }

    mostrarTicket(); 
}


function comprar() {
    const ticketContent = productosSeleccionados.map(producto => 
        `${producto.cantidad} x ${producto.nombre} (${producto.tipoCompra}) - $${producto.precioTotal.toFixed(2)}\nFamilia: ${producto.familia}\nOrigen: ${producto.origen}`
    ).join('\n');

    const totalGeneral = productosSeleccionados.reduce((sum, producto) => sum + producto.precioTotal, 0);
    const totalTicket = `Total: $${totalGeneral.toFixed(2)}`;

    const blob = new Blob([ticketContent + '\n' + totalTicket], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticket.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


function borrar() {
    productosSeleccionados = [];
    document.getElementById('ticket').innerHTML = '';
    document.getElementById('familia').value = '';
    document.getElementById('tipo').value = '';
}


function modificarTicket() {
    const nombreProducto = prompt("Ingresa el nombre del producto que deseas modificar:");
    const productoExistente = productosSeleccionados.find(producto => producto.nombre === nombreProducto);

    if (!productoExistente) {
        alert("Producto no encontrado en el ticket.");
        return;
    }

    const nuevaCantidad = parseInt(prompt("Ingresa la nueva cantidad:"));

    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
        alert("Cantidad no válida.");
        return;
    }

    
    const precioPorUnidad = productoExistente.tipoCompra === 'kilo' ? productoExistente.precioUnidad : productoExistente.precioUnidad;
    productoExistente.cantidad = nuevaCantidad;
    productoExistente.precioTotal = nuevaCantidad * precioPorUnidad;

    mostrarTicket(); 
}


cargarProductos('frutas'); 
