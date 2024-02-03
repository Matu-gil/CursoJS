
fetch('data.json')
    .then(response => response.json())
    .then(datos => {
        for (const auto of datos) {
            let contenedor = document.createElement("div");

            contenedor.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${auto.imagen}" class="card-img-top">
                    <div class="car">
                        <h5 class="card-title">${auto.id} ${auto.nombre}</h5>
                        <p class="card-text">${auto.precio}</p>
                    </div>
                </div>`;
            document.body.appendChild(contenedor);
        }
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));



    let contenedor1 = document.getElementById("contenedor1");

contenedor1.innerHTML = `
    <h1>BIENVENIDO AL CONCESIONARIO DE EKKO</h1>
    <h2>Aquí encontrarás una alta gama de Vehículos</h2>
    <p>Ingrese a continuación su Nombre y Apellido</p>
    <input id="nombreYApellido" type="text">
    <button id="enter">Enter</button>`;

const contenedor3 = document.getElementById("contenedor3");
let boton = document.getElementById("enter");

boton.addEventListener("click", function () {
    let nombreYApellido = document.getElementById("nombreYApellido").value;
    let contenedor2 = document.getElementById("contenedor2");
    contenedor2.innerHTML = `
      <p>Bienvenido ${nombreYApellido} al concesionario de tus sueños!</p>
      <p>Desea comprar un vehículo el día de hoy?</p>
      <button id="si">SI</button>
      <button id="no">NO</button>`;

    let botonSi = document.getElementById("si");
    let botonNo = document.getElementById("no");

    botonSi.addEventListener("click", function () {
        contenedor3.innerHTML = `
        <h3>Gracias por decidir comprar con nosotros. Ingrese a continuación el Nro del Vehículo que desea comprar</h3>
        <input id="numeroVehiculo" type="number" min="1" max="10" step="1">
        <button id="confirmar">Confirmar</button>`;

        let botonConfirmar = document.getElementById("confirmar");
        botonConfirmar.addEventListener("click", function () {
            let numeroVehiculo = parseInt(document.getElementById("numeroVehiculo").value);
            let vehiculoSeleccionado = datos.find( data => data.id === numeroVehiculo);

            if (vehiculoSeleccionado) {
                comprarVehiculo(vehiculoSeleccionado);
            } else {
                contenedor3.innerHTML = `<p>Número de vehículo no válido. Por favor, ingrese un número válido.</p>`;
            }
        });
    });

    botonNo.addEventListener("click", function () {
        contenedor3.innerHTML = `<p>Muchas Gracias por su visita.</p>`;
    });
});


function comprarVehiculo(vehiculo) {
    let contenedor4 = document.getElementById("contenedor4");
    let contenido ="";

    for (let i = 0; i < datos.length; i++) {
        if (vehiculo.id === datos[i].id) {
            let precio = parseFloat(vehiculo.precio.replace("USD", "").replace(",", ""));

            if (precio >= 60000) {
                precio = aplicarDescuento(precio);
                contenido =`
                        <h3>Felicitaciones por tu compra!</h3>
                        <div class="card" style="width: 18rem;">
                            <img src="${vehiculo.imagen}" class="card-img-top">
                            <div class="car">
                                <h5 class="card-title">${vehiculo.id} ${vehiculo.nombre}</h5>
                                <p class="card-text">Precio con descuento: $${precio.toFixed(2)}</p>
                            </div>
                        </div>
                        <p>Gracias por tu compra, se te ha aplicado un descuento de $${precio.toFixed(2)}. ¡Vuelve pronto!</p>
                    </div>`;
            } else {
              contenido = `
                    <div id="contenedor4">
                        <h3>Felicitaciones por tu compra!</h3>
                        <div class="card" style="width: 18rem;">
                            <img src="${vehiculo.imagen}" class="card-img-top">
                            <div class="car">
                                <h5 class="card-title">${vehiculo.id} ${vehiculo.nombre}</h5>
                                <p class="card-text">Precio: ${vehiculo.precio}</p>
                            </div>
                        </div>
                        <p>Gracias por tu compra. ¡Disfruta tu nuevo vehículo!</p>
                    </div>`;
            }
            break;
        }
    }
    contenedor4.innerHTML = contenido;
}

function aplicarDescuento(precio) {
    return precio / 15;
}