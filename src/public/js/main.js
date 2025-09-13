console.log('Hola desde main.js');

const socket = io();

// crear una variable que guarde el prodcuto
let producto;

const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const thumbnails = document.getElementById('thumbnails');
const addProductForm = document.getElementById('formAgregarProducto');
const listaProductos = document.getElementById('listaProductos');


// Enviar el formulario y el producto por websocket
addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // evitar que se recargue la pagina

    // crear el objeto producto
    producto = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: parseFloat(price.value),
        stock: parseInt(stock.value),
        category: category.value,
    }

    // enviar el producto al servidor por http
    const productoAgregado = await fetch('/api/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    });

    console.log('Producto agregado:', productoAgregado);

});

socket.on('productosActualizados', (productos) => {

    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.innerText = `${producto.title} - ${producto.description} - $${producto.price}`;
        listaProductos.appendChild(li);
    })
    
})