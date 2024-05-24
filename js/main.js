const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const wishlist = [];
const productos = [
    {
        id: "producto1",
        titulo: "Contorno de Ojos",
        imagen: "./images/producto1.jpg",
        descripcion: "Hidrata, reduce ojeras y líneas finas, dejando tu mirada fresca y rejuvenecida. Ideal para pieles sensibles.",
        precio: 1500
    },
    {
        id: "producto2",
        titulo: "Crema Corporal",
        imagen: "./images/producto2.jpg",
        descripcion: "Nutre e hidrata profundamente, dejando tu piel suave, firme y radiante. Perfecta para todo tipo de piel.",
        precio: 2000
    },
    {
        id: "producto3",
        titulo: "Spray Corporal",
        imagen: "./images/producto3.jpg",
        descripcion: "Refresca e hidrata al instante, dejando un aroma suave y duradero. Ideal para una piel revitalizada y perfumada.",
        precio: 2500
    },
    {
        id: "producto4",
        titulo: "Crema Hidratante",
        imagen: "./images/producto4.jpg",
        descripcion: "Hidrata profundamente, suaviza y revitaliza la piel, proporcionando un brillo natural a la vez. Perfecta para uso diario.",
        precio: 2500,
    },
    {
        id: "producto5",
        titulo: "Perfume Esencia Floral",
        imagen: "./images/producto5.jpg",
        descripcion: "Fragancia delicada y femenina, con notas de jazmín y rosa. Ideal para días románticos.",
        precio: 4000
    },
    {
        id: "producto6",
        titulo: "Perfume Cítrico Fresco",
        imagen: "./images/producto6.jpg",
        descripcion: "Energizante y vibrante, con toques de limón y bergamota. Perfecto para un impulso refrescante.",
        precio: 5000
    },
    {
        id: "producto7",
        titulo: "Perfume Dulce Vainilla",
        imagen: "./images/producto7.jpg",
        descripcion: "Atractivo y acogedor, con matices de vainilla y almendra. Ideal para una noche cálida y envolvente.",
        precio: 5000
    },
    {
        id: "producto8",
        titulo: "Perfume Fruta Tropical",
        imagen: "./images/producto8.jpg",
        descripcion: "Exótico y vibrante, con esencias de mango y piña. Ideal para un día lleno de aventura.",
        precio: 5000
    },
    {
        id: "producto9",
        titulo: "Body Oil Esencia",
        imagen: "./images/producto9.jpg",
        descripcion: "Nutre e hidrata intensamente, dejando la piel suave y radiante. Ideal para un brillo saludable y sedoso.",
        precio: 4000
    },
    {
        id: "producto10",
        titulo: "Crema Hidratante Facial",
        imagen: "./images/producto10.jpg",
        descripcion: "Hidrata sin obstruir poros, controla el brillo y deja la piel fresca y equilibrada.",
        precio: 3500
    }
];


const seccionProductos = document.querySelector("#seccion-productos");
const carroVacio = document.querySelector("#carro-vacio");
const productosEnCarrito = document.querySelector("#lista-productos-en-carrito");
const totalCarrito = document.querySelector("#total");
const vaciar = document.querySelector("#button-vaciar");
const compraCarrito = document.querySelector("#compra-carrito");
const compraRealizada = document.querySelector("#compra-realizada");
const buttonComprar = document.querySelector("#button-comprar");


    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("contenedor-producto");
        div.innerHTML = `
        <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}">
        <button class="button-heart"><i class="bi bi-bookmark-heart"></i></button>
        <button class="button-heart-fill"><i class="bi bi-bookmark-heart-fill"></i></button>
            <div class="texto-producto">
                <h4>${producto.titulo}</h4>
                <p class="descripcion-productos">${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
            </div>
        `

        let button = document.createElement("button");
        button.classList.add("button-bag");
        button.innerHTML = `<i class="bi bi-bag-plus"></i>`;
        button.addEventListener("click", () => {
            agregarAlCarrito(producto);
            Toastify({

                text: "Producto agregado",
                duration: 3000,
                close: true,
                style: {
                    background: "linear-gradient(to right, #B9EDA0, #A1CC8B)",
                  },
                }).showToast();
        })
        div.append(button);
        seccionProductos.append(div);
    });


const mostrarCarrito = () => {
    if (carrito.length === 0) {
        carroVacio.classList.remove("oculto");
        productosEnCarrito.classList.add("oculto");
        vaciar.classList.add("oculto");
        compraCarrito.classList.add("oculto");
        compraRealizada.classList.add("oculto");
    } else {
        carroVacio.classList.add("oculto");
        productosEnCarrito.classList.remove("oculto");
        vaciar.classList.remove("oculto");
        compraCarrito.classList.remove("oculto");
        compraRealizada.classList.add("oculto");

        productosEnCarrito.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("producto-en-carrito");
            div.innerHTML = `
            <img class="imagen-producto-en-carrito" src="${producto.imagen}" alt="${producto.titulo}">
            <p>${producto.titulo}</p>
            <p>$${producto.precio}</p>
            <div class="producto-en-carrito-cantidad">
                <p>${producto.cantidad} u</p>
            </div>
            `;            

            let buttonDash = document.createElement("button");
            buttonDash.classList.add("button-restar");
            buttonDash.innerHTML = `<i class="bi bi-dash-circle"></i>`;
            buttonDash.addEventListener("click", () => {
                restarCantidad(producto);
            });


            let buttonPlus = document.createElement("button");
            buttonPlus.classList.add("button-agregar");
            buttonPlus.innerHTML = `<i class="bi bi-plus-circle"></i>`;
            buttonPlus.addEventListener("click", () => {
                sumarCantidad(producto);
            });

            let buttonTrash = document.createElement("button");
            buttonTrash.classList.add("button-eliminar");
            buttonTrash.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
            buttonTrash.addEventListener("click", () => {
                eliminarDeCarro(producto);
            });

            div.append(buttonDash);
            div.append(buttonPlus);
            div.append(buttonTrash);
            productosEnCarrito.append(div);
        });
    };
    totalDelCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


const agregarAlCarrito = (producto) => {
    const itemAgregado = carrito.find(item => item.id === producto.id);
    if (itemAgregado) {
        itemAgregado.cantidad++;
    } else {
        carrito.push({...producto, cantidad:1});
    }
    mostrarCarrito();
};

const eliminarDeCarro = (producto) => {
    const productoIndex = carrito.findIndex(item => item.id === producto.id);
    carrito.splice(productoIndex, 1);
    mostrarCarrito();
};

const totalDelCarrito = () => {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    totalCarrito.innerText = `Total: $${total}`;
};

const restarCantidad = (producto) => {
    const itemAgregado = carrito.find(item => item.id === producto.id);
    if (itemAgregado.cantidad> 1) {
        itemAgregado.cantidad--;
    }
    mostrarCarrito();
};

const sumarCantidad = (producto) => {
    const itemAgregado = carrito.find(item => item.id === producto.id);
    itemAgregado.cantidad++;
    mostrarCarrito();
};


vaciar.addEventListener("click", () => {
    carrito.length = 0; 
    mostrarCarrito();
});


buttonComprar.addEventListener("click", carritoComprado);
function carritoComprado() {
    carrito.length = 0;
    carroVacio.classList.add("oculto");
    productosEnCarrito.classList.add("oculto");
    vaciar.classList.add("oculto");
    compraCarrito.classList.add("oculto");
    compraRealizada.classList.remove("oculto");
};

mostrarCarrito();

