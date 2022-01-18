/* 
Script para añadir productos al carrito desde la tienda.
*/

const btnAddToCart = document.querySelectorAll('.btn-add');
let cart = [];

// si existe el cart, añadir los productos al cart.
// Si no siempre que entre a la view se reiniciará el cart.
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
});

for (let i = 0; i < btnAddToCart.length; i++) {
    btnAddToCart[i].addEventListener('click', () => {
        const data = btnAddToCart[i].dataset.product; // variable data contiene la info en stringify.
        addToLocalStorage(JSON.parse(data));
    });
}

const addToLocalStorage = data => {

    if (localStorage.getItem('cart')) {
        const cartLS = JSON.parse(localStorage.getItem('cart')); // se obtiene el cart que está en el localStorage.

        for (let i = 0; i < cartLS.length; i++) {
            if (cartLS[i].name === data.name) { // se valida si en el localStorage existe el nuevo producto.
                return;
            }
        }
    }

    cart.push(data); // si no existe, se ingresa
    localStorage.setItem('cart', JSON.stringify(cart));
}