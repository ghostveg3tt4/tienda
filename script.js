// Función para generar precios aleatorios
function generarPrecio() {
    return Math.floor(Math.random() * (3000 - 1200 + 1)) + 1200;
}

// Datos de los productos
const productos = [
    {
        producto: "Laptop",
        marca: "HP",
        memoria: "32GB",
        disco: "2TB",
        procesador: "Intel i9",
        sistema: "Windows 11",
        imagen: "img/hp.jpg"
    },
    {
        producto: "Laptop",
        marca: "Lenovo",
        memoria: "16GB",
        disco: "1TB",
        procesador: "Intel i7",
        sistema: "Windows 11",
        imagen: "img/lenovo.jpg"
    },
    {
        producto: "Laptop",
        marca: "Dell",
        memoria: "32GB",
        disco: "2TB",
        procesador: "Intel i9",
        sistema: "Windows 11",
        imagen: "img/dell.jpg"
    },
    {
        producto: "Laptop",
        marca: "Asus",
        memoria: "16GB",
        disco: "1TB",
        procesador: "Intel i7",
        sistema: "Windows 11",
        imagen: "img/asus.jpg"
    },
    {
        producto: "Laptop",
        marca: "AOC",
        memoria: "32GB",
        disco: "2TB",
        procesador: "Intel i9",
        sistema: "Windows 11",
        imagen: "img/aoc.jpg"
    },
    {
        producto: "Laptop",
        marca: "Acer",
        memoria: "32GB",
        disco: "2TB",
        procesador: "Intel i9",
        sistema: "Windows 11",
        imagen: "img/acer.jpg"
    }
];

// Función para renderizar los productos en el catálogo
function renderizarProductos() {
    const container = document.getElementById('products-container');

    if (container) {
        productos.forEach(producto => {
            const precio = generarPrecio();
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.marca}" class="product-image">
                <div class="product-info">
                    <h2>${producto.marca}</h2>
                    <h3>${producto.producto} Gaming</h3>
                    <p><strong>Memoria:</strong> ${producto.memoria}</p>
                    <p><strong>Disco Duro:</strong> ${producto.disco}</p>
                    <p><strong>Procesador:</strong> ${producto.procesador}</p>
                    <p><strong>Sistema Operativo:</strong> ${producto.sistema}</p>
                    <p class="product-price">$${precio}.00</p>
                    <button class="add-to-cart">Añadir al carrito</button>
                </div>
            `;

            container.appendChild(productCard);
        });
    }
}

// Función para manejar el formulario de contacto
function manejarFormularioContacto() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Aquí iría la lógica para enviar el formulario
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            form.reset();
        });
    }
}

// Función para inicializar la búsqueda
function inicializarBusqueda() {
    // Solo inicializar si estamos en la página de catálogo
    if (window.location.pathname.includes('catalogo.html')) {
        const searchBox = document.querySelector('.search-box');

        if (searchBox) {
            const input = searchBox.querySelector('input');
            const button = searchBox.querySelector('button');

            button.addEventListener('click', function() {
                buscarProductos(input.value);
            });

            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    buscarProductos(input.value);
                }
            });
        }
    }
}

// Función para buscar productos por marca
function buscarProductos(termino) {
    const container = document.getElementById('products-container');

    if (!container) return; // Si no estamos en la página de catálogo, salir

    // Limpiar el contenedor de productos
    container.innerHTML = '';

    if (termino.trim() === '') {
        // Si el término de búsqueda está vacío, mostrar todos los productos
        renderizarProductos();
        return;
    }

    // Filtrar productos que coincidan con la marca (case insensitive)
    const terminoBusqueda = termino.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.marca.toLowerCase().includes(terminoBusqueda)
    );

    if (productosFiltrados.length === 0) {
        // Mostrar mensaje si no hay resultados
        container.innerHTML = `
            <div class="no-results">
                <p>No se encontraron productos de la marca "${termino}"</p>
                <button id="show-all" class="cta-button">Mostrar todos los productos</button>
            </div>
        `;

        // Agregar evento al botón para mostrar todos los productos
        document.getElementById('show-all')?.addEventListener('click', () => {
            renderizarProductos();
            document.querySelector('.search-box input').value = '';
        });
    } else {
        // Mostrar los productos filtrados
        productosFiltrados.forEach(producto => {
            const precio = generarPrecio();
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.marca}" class="product-image">
                <div class="product-info">
                    <h2>${producto.marca}</h2>
                    <h3>${producto.producto} Gaming</h3>
                    <p><strong>Memoria:</strong> ${producto.memoria}</p>
                    <p><strong>Disco Duro:</strong> ${producto.disco}</p>
                    <p><strong>Procesador:</strong> ${producto.procesador}</p>
                    <p><strong>Sistema Operativo:</strong> ${producto.sistema}</p>
                    <p class="product-price">$${precio}.00</p>
                    <button class="add-to-cart">Añadir al carrito</button>
                </div>
            `;

            container.appendChild(productCard);
        });
    }
}

// Evento cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos();
    manejarFormularioContacto();
    inicializarBusqueda();
});