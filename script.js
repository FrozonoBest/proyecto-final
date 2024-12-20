// Obtener los elementos del carrito de la sesión
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// Actualizar el carrito en la página
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar los productos actuales

    let totalPrice = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item-carrito');
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>`;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += parseFloat(item.price);
    });

    // Actualizar el total del carrito
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Agregar producto al carrito
function addToCart(id, name, price, image) {
    const newItem = { id, name, price, image };
    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Eliminar producto del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
}

// Función que inicializa los eventos y el carrito
function init() {
    // Agregar eventos a los botones "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const name = event.target.getAttribute('data-name');
            const price = event.target.getAttribute('data-price');
            const image = event.target.previousElementSibling.src;  // Obtener la imagen
            addToCart(id, name, price, image);
        });
    });

    // Eliminar productos del carrito
    if (document.getElementById('cart-items')) {
        document.getElementById('cart-items').addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-from-cart')) {
                const id = event.target.getAttribute('data-id');
                removeFromCart(id);
            }
        });
    }

    // Agregar funcionalidad de proceder a la compra
    const checkoutButton = document.querySelector('.btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', proceedToCheckout);
    }

    updateCartCount();
    if (document.getElementById('cart-items')) {
        updateCartItems();
    }
}

// Función para proceder con la compra
function proceedToCheckout() {
    if (cart.length > 0) {
        // Mostrar una alerta de compra exitosa
        alert("¡Compra realizada con éxito!");

        // Limpiar el carrito
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Actualizar el contador y la vista del carrito
        updateCartCount();
        updateCartItems();
    } else {
        alert("El carrito está vacío.");
    }
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el envío real del formulario (para propósito demostrativo)

    // Alerta de éxito
    alert("¡Formulario enviado con éxito!");

    // Limpiar los campos del formulario
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', init);
