const btnAddToCart = document.querySelectorAll('.btn-add');
let cart = [];

// si existe el cart, añadir los productos al carrito. Si no siempre que entre a la view se reiniciará el cart.
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
});

for (let i = 0; i < btnAddToCart.length; i++) {
    btnAddToCart[i].addEventListener('click', () => {
        const data = btnAddToCart[i].dataset.product; // se añade la variable data que tiene la info en stringify.
        addToLocalStorage(JSON.parse(data)); // se envia la data parseada.
    });
}

const addToLocalStorage = data => {

    if (localStorage.getItem('cart')) {
        cartLS = JSON.parse(localStorage.getItem('cart')); // se obtiene el cart que está en el localStorage.

        for (let i = 0; i < cartLS.length; i++) {
            if (cartLS[i].name === data.name) { // se valida si en el localStorage existe el nuevo producto.
                return;
            }
        }
    }

    cart.push(data); // si no existe pues se ingresa
    localStorage.setItem('cart', JSON.stringify(cart));
}