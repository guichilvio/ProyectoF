
let productoSeleccionado = null;
let productosSeleccionados = [];


const productosHerramientas = [
    { nombre: 'Martillo', origen: 'China', familia: 'Herramientas de Mano', costoUnidad: 5.0, descripcion: 'Martillo de acero', imagen: '/img/martillo.png' },
    { nombre: 'Destornillador', origen: 'India', familia: 'Herramientas de Mano', costoUnidad: 2.5, descripcion: 'Destornillador Phillips', imagen: '/img/destornillador.png' },
    { nombre: 'Llave Inglesa', origen: 'Japón', familia: 'Herramientas de Mano', costoUnidad: 4.0, descripcion: 'Llave inglesa ', imagen: '/img/llave.png' },
    { nombre: 'Sierra', origen: 'Alemania', familia: 'Herramientas de Corte', costoUnidad: 6.5, descripcion: 'Sierra de mano', imagen: '/img/sierra.png' },
    { nombre: 'Taladro', origen: 'EEUU', familia: 'Herramientas Eléctricas', costoUnidad: 50.0, descripcion: 'Taladro eléctrico', imagen: '/img/tal.png' },
    { nombre: 'Caja de Herramientas', origen: 'China', familia: 'Accesorios', costoUnidad: 20.0, descripcion: 'Caja de herramientas portátil', imagen: '/img/caja.png' },
];


const productosMateriales = [
    { nombre: 'Clavos', origen: 'México', familia: 'Materiales', costoUnidad: 3.0, descripcion: 'Paquete de clavos', imagen: '/img/clavo.png' },
    { nombre: 'Tornillos', origen: 'España', familia: 'Materiales', costoUnidad: 4.0, descripcion: 'Paquete de tornillos', imagen: '/img/tornillo.png' },
    { nombre: 'Pintura', origen: 'Italia', familia: 'Materiales', costoUnidad: 15.0, descripcion: 'Pintura acrílica', imagen: '/img/pintura.png' },
    { nombre: 'Pegamento', origen: 'EEUU', familia: 'Materiales', costoUnidad: 2.0, descripcion: 'Pegamento instantáneo', imagen: '/img/pegamento.png' },
    { nombre: 'Madera', origen: 'Canadá', familia: 'Materiales', costoUnidad: 20.0, descripcion: 'Tablones de madera', imagen: '/img/tabla.png' },
    { nombre: 'Tubería de PVC', origen: 'Colombia', familia: 'Materiales', costoUnidad: 10.0, descripcion: 'Tubería de PVC ', imagen: '/img/tuberias.png' },
];


function cargarProductos(categoria) {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';

    const productos = categoria === 'herramientas' ? productosHerramientas : productosMateriales;

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = crearElementoProducto(producto);
        productosGrid.appendChild(div);
    });
}


function crearElementoProducto(producto) {
    return `
        <div class="producto" onclick="seleccionarProducto('${producto.nombre}', '${producto.descripcion}', '${producto.origen}', ${producto.costoUnidad}, '${producto.familia}')">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.costoUnidad.toFixed(2)}</p>
            <p>${producto.descripcion}</p>
        </div>
    `;
}


function seleccionarProducto(nombre, descripcion, origen, costo, familia) {
    productoSeleccionado = { nombre, descripcion, origen, costo, familia };
    document.getElementById('producto-cantidad').value = 1; 
    
   
    document.getElementById('detalle-producto').innerHTML = `
        <h3>${nombre}</h3>
        <p>Descripción: ${descripcion}</p>
        <p>Origen: ${origen}</p>
        <p>Familia: ${familia}</p>
        <p>Precio por unidad: $${costo.toFixed(2)}</p>
    `;
}


function agregarAlTicket() {
    if (!productoSeleccionado) {
        return alert('Por favor, selecciona un producto antes de agregarlo al ticket.');
    }

    const cantidad = parseInt(document.getElementById('producto-cantidad').value);
    const tamano = document.getElementById('producto-tamano').value;
    let costoModificado = productoSeleccionado.costo;

    
    switch(tamano) {
        case 'chico':
            costoModificado *= 0.9; 
            break;
        case 'mediano':
            
            break;
        case 'grande':
            costoModificado *= 1.2;  
            break;
    }

    const total = costoModificado * cantidad;

    const productoExistente = productosSeleccionados.find(p => p.nombre === productoSeleccionado.nombre && p.tamano === tamano);

    if (productoExistente) {

        productoExistente.cantidad += cantidad;
        productoExistente.total += total;
    } else {

        productosSeleccionados.push({
            ...productoSeleccionado,
            cantidad,
            total,
            tamano,
            costo: costoModificado
        });
    }

    mostrarTicket();
}
function mostrarTicket() {
    const ticketDiv = document.getElementById('ticket');
    ticketDiv.innerHTML = '';

    productosSeleccionados.forEach(producto => {
        ticketDiv.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p>${producto.cantidad} x ${producto.nombre} (${producto.tamano}) - $${producto.total.toFixed(2)}</p>
            </div>
        `;
    });


    const totalGeneral = productosSeleccionados.reduce((sum, producto) => sum + producto.total, 0);
    ticketDiv.innerHTML += `<strong>Total: $${totalGeneral.toFixed(2)}</strong>`;
}


function comprar() {
    const ticketContent = productosSeleccionados.map(producto => 
        `${producto.cantidad} x ${producto.nombre} (${producto.tamano}) - $${producto.total.toFixed(2)}\nDescripción: ${producto.descripcion}\nOrigen: ${producto.origen}`
    ).join('\n');

    const totalGeneral = productosSeleccionados.reduce((sum, producto) => sum + producto.total, 0);
    const ticketCompleto = ticketContent + `\nTotal: $${totalGeneral.toFixed(2)}`;

    const blob = new Blob([ticketCompleto], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ticket_compra.txt';
    link.click();
}


function limpiarTicket() {
    productosSeleccionados = [];
    document.getElementById('ticket').innerHTML = '';
    alert('El ticket ha sido borrado.');
}

cargarProductos('herramientas'); 
