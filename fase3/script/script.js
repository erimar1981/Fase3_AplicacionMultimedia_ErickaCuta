// Reemplaza tu definición actual de carrito con el siguiente código
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar elementos al carrito
function agregarAlCarrito(nombre, valor, cantidad, imagen, descripcion) {
    if (cantidad <= 0) {
        if (nombre.includes("Agregar")) {
            alert(`Ingrese la cantidad de ${nombre} que desea comprar.`);
        }
        return;
    }
    carrito.push({ nombre, valor, cantidad, imagen, descripcion, tipo: "producto" });
    console.log(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage
}

// Función para agregar servicios de veterinario al carrito
function agregarServicioAlCarrito(nombre, valor, imagen, descripcion) {
    carrito.push({ nombre, valor, cantidad: 1, imagen, tipo: "servicio" });
    console.log(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage
}

const botonesVeterinarios = document.querySelectorAll(".boton-veterinario");
botonesVeterinarios.forEach((boton) => {
    boton.addEventListener("click", () => {
        let nombreVeterinario = boton.id.substring(11); // Obtiene el nombre del veterinario desde el ID del botón
        let valorServicio = obtenerValorPorEspecializacion(nombreVeterinario); // Obtener el valor según la especialización
        let imagenVeterinario = event.currentTarget.getAttribute("data-imagen");

        agregarServicioAlCarrito(nombreVeterinario, valorServicio, imagenVeterinario);
    });
});

function obtenerValorPorEspecializacion(nombre) {
    switch (nombre) {
        case 'LindaOvalle':
            return 50000;
        case 'CarlosRodriguez':
            return 50000;
        case 'PedroMorales':
            return 70000;
        case 'CeciliaCamargo':
            return 80000;
        default:
            return 0;
    }
}
const botonesProductos = document.querySelectorAll(".boton-producto");
botonesProductos.forEach((button, index) => {
    button.addEventListener("click", () => {
        let nombreProducto = "";
        let valorProducto = "";
        let cantidadProducto = "";
        let imagenProducto = "";        
        // Lógica para obtener el nombre, valor y cantidad del producto según el botón presionado
        if (button.id === "agregarPurina") {
            nombreProducto = "PURINA";
            valorProducto = 4000;
            cantidadProducto = document.getElementById("CantidadPurina").value;
            imagenProducto = event.currentTarget.getAttribute("data-imagen");
            console.log(imagenProducto);
            
        } else if (button.id === "agregarCookies") {
            nombreProducto = "Cookies";
            // Lógica para Cookies
            if (document.getElementById("CantidadCookiesPequeño").value > 0) {
                nombreProducto += " - Pequeño: 50 Gr";
                valorProducto = 10000;
                imagenProducto = event.currentTarget.getAttribute("data-imagen");
                cantidadProducto = document.getElementById("CantidadCookiesPequeño").value;
            }
            if (document.getElementById("CantidadCookiesMediano").value > 0) {
                nombreProducto += " - Mediano: 100 Gr";
                valorProducto = 20000;
                imagenProducto = event.currentTarget.getAttribute("data-imagen");
                cantidadProducto = document.getElementById("CantidadCookiesMediano").value;
            }
            if (document.getElementById("CantidadCookiesGrande").value > 0) {
                nombreProducto += " - Grande: 150 Gr";
                valorProducto = 30000;
                imagenProducto = event.currentTarget.getAttribute("data-imagen");
                cantidadProducto = document.getElementById("CantidadCookiesGrande").value;
            }
        } else if (button.id === "agregarEnlatadosMeat") {
            nombreProducto = "Enlatados Meat";
            // Lógica para Enlatados Meat
            if (document.getElementById("CantidadEnlatadosPequeño").value > 0) {
                nombreProducto += " - Pequeño: 200 Gr";
                valorProducto = 30000;
                imagenProducto = event.currentTarget.getAttribute("data-imagen");
                cantidadProducto = document.getElementById("CantidadEnlatadosPequeño").value;
            }
            if (document.getElementById("CantidadEnlatadosMediano").value > 0) {
                nombreProducto += " - Mediano: 500 Gr";
                valorProducto = 40000;
                imagenProducto = event.currentTarget.getAttribute("data-imagen");
                cantidadProducto = document.getElementById("CantidadEnlatadosMediano").value;
            }
            if (document.getElementById("CantidadEnlatadosGrande").value > 0) {
                nombreProducto += " - Grande: 800 Gr";
                valorProducto = 60000;
                imagenProducto = event.currentTarget.getAttribute("data-imagen");
                cantidadProducto = document.getElementById("CantidadEnlatadosGrande").value;
            }
        }
        if (button.parentNode.parentNode.children[0].innerText.includes("Gatos")) {
            nombreProducto = "Disfraz para Gatos";
            valorProducto = 25000;
            cantidadProducto = 1;
            imagenProducto = event.currentTarget.getAttribute("data-imagen");
        } else if (button.parentNode.parentNode.children[0].innerText.includes("Perros")) {
            nombreProducto = "Disfraz para Perros";
            valorProducto = 30000;
            cantidadProducto = 1;
            imagenProducto = event.currentTarget.getAttribute("data-imagen");
        }

        agregarAlCarrito(nombreProducto, valorProducto, cantidadProducto, imagenProducto);

    });
});

// Obtén el contenedor de productos del carrito
const carritoProductsContainer = document.getElementById('carrito-products');

carrito.forEach(item => {
    const car = document.createElement('div');
    car.className = 'car';
    if (item.tipo === 'producto') {
        const nombre = document.createElement('p');
        nombre.textContent = `Nombre del Producto: ${item.nombre}`;
        const cantidad = document.createElement('p');
        cantidad.textContent = `Cantidad: ${item.cantidad}`;
        const valor = document.createElement('p');
        valor.textContent = `Valor: $${item.valor}`;
        const imagen = document.createElement('img');
        imagen.src = item.imagen;
        imagen.style.height = '150px';  // Establece la altura en 150 píxeles
        imagen.style.width = '150px';   // Establece el ancho en 150 píxeles
        car.appendChild(nombre);
        car.appendChild(cantidad);
        car.appendChild(valor);
        car.appendChild(imagen);
    } else if (item.tipo === 'servicio') {
        const nombre = document.createElement('p');
        nombre.textContent = `Nombre del Veterinario: ${item.nombre}`;
        const valor = document.createElement('p');
        valor.textContent = `Valor del Servicio: $${item.valor}`;
        const imagen = document.createElement('img');
        imagen.src = item.imagen;
        imagen.style.height = '150px';  // Establece la altura en 150 píxeles
        imagen.style.width = '150px';   // Establece el ancho en 150 píxeles
        car.appendChild(nombre);
        car.appendChild(valor);
        car.appendChild(imagen);
    }
    carritoProductsContainer.appendChild(car);
});