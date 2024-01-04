document.addEventListener('DOMContentLoaded', () => {
   
    const productosContainer = document.getElementById('productos');
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');
    let producto = JSON.parse(localStorage.getItem("producto")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // productos con precio y stock
    const productos = [
        { id: 1, nombre: 'Chocolate x100gr', precio: 750, stock: 1000 },
        { id: 2, nombre: 'Cafe x 1kg', precio: 3000, stock: 500 },
        { id: 3, nombre: 'Pan dulce ', precio: 2500, stock: 481 },
        { id: 4, nombre: 'Nugaton x50gr', precio: 525, stock: 770 },
        { id: 5, nombre: 'Pionono', precio: 860, stock: 150 },
    ];
    
    //  mostrar productos 
    function mostrarProductos() {
            productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.className = 'producto';
            productoElement.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            `;
            productosContainer.appendChild(productoElement);
        });
    }
   
   //  agregar productos al carrito
   agregarAlCarrito = (productId) => {
    const productoSeleccionado = productos.find(producto => producto.id === productId);
    const cantidadInput = document.getElementById(`cantidad-${productId}`);
    const cantidad = parseInt(cantidadInput.value);

    if (productoSeleccionado && productoSeleccionado.stock >= cantidad) {
        if (cantidadesEnCarrito[productId]) {
            cantidadesEnCarrito[productId] == cantidad;
        } else {
            cantidadesEnCarrito[productId] = cantidad;
        }

        const itemEnCarrito = document.createElement('li');
        itemEnCarrito.innerHTML = `${productoSeleccionado.nombre} - $${productoSeleccionado.precio} x ${cantidad}`;
        carritoLista.appendChild(itemEnCarrito);

        productoSeleccionado.stock == cantidad;
        mostrarProductos();
        actualizarTotal();
    } else {
        alert('Cantidad no válida o producto agotado');
    }
};
    //  agregar productos al carrito
    agregarAlCarrito = (productId) => {
        const productoSeleccionado = productos.find(producto => producto.id === productId);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        if (productoSeleccionado && productoSeleccionado.stock > 0) {
            const itemEnCarrito = document.createElement('li');
            itemEnCarrito.innerHTML = `${productoSeleccionado.nombre} - $${productoSeleccionado.precio}`;
            carritoLista.appendChild(itemEnCarrito);

            productoSeleccionado.stock--;
             actualizarTotal();
        } else {
            alert('Producto agotado');
        }
    };

    //  actualizar el total del carrito
    function actualizarTotal() {
        let total = 0;
        localStorage.setItem("productos", JSON.stringify(producto));
        Array.from(carritoLista.children).forEach(item => {
            const precio = parseFloat(item.innerHTML.split('$')[1]);
            total += precio;

        });
        totalElement.textContent = total.toFixed(2);
    }

    mostrarProductos();
});
