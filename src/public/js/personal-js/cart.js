const products = JSON.parse(localStorage.getItem('cart')); // se obtienen los productos parseados.
const items = document.getElementById('items');
const toPay = document.getElementById('toPay');
const section = document.getElementById('cartShop');
const fragment = document.createDocumentFragment(); // fragment para insertar los productos a items.

document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('cart')) { // si no existe cart en el localStorage.
        whitOutProducts();
    }
    setToCart();
});

const whitOutProducts = () => {
    section.innerHTML = `
        <div class="col-lg-12 wow fadeInDown" data-wow-delay=".4s">
            <h6 class="text-center mb-3">carrito vacío</h6>
            <div class="button d-flex justify-content-center">
                <a href="/tienda" class="btn">Volver a tienda</a>
            </div>
        </div>
        `;
}

const setToCart = () => {

    if (products.length === 0) { // si el usuario elimina lso productos del carrito.
        localStorage.removeItem('cart');
        whitOutProducts();
        return;
    }

    items.innerHTML = ''; // se vacía la sección 'items' para cuando vuelva a agregar productos no se sobreescriba.
    let count = 0; // variable para identificar los productos en el cart.
    products.forEach(item => {

        const div = document.createElement('div');
        const content = `
            <div class="row">
                <div class="col-lg-12 d-flex justify-content-end">
                    <h6 class="delete" data-id="${count++}" style="cursor: pointer;">X</h6>
                </div>
                <div class="col-lg-4 text-center">
                    <img src="/images/products/${item.logo}" alt="imagen" style="height: 100px;">
                </div>
                <div class="col-lg-8 d-flex align-items-center">
                    <p>Curso de <span>${item.name}</span></p>
                </div>
                <hr class="my-3">
            </div>
            `
        div.innerHTML = content;
        fragment.appendChild(div);

        // se añade un listener a los botones para eliminar productos, se ejecuta una función, curioso que no tenga el ().
        div.querySelector('.delete').addEventListener('click', removeProduct);
    });

    items.appendChild(fragment); // se añaden los productos.
    payProducts();

    localStorage.setItem('cart', JSON.stringify(products)); // se añaden los productos al localStorage por cada actualización.
}

const payProducts = () => {

    let subTotal = 0;
    let total = 0;

    products.forEach(item => {
        subTotal += parseFloat(item.price.$numberDecimal);
    });

    total = subTotal + (subTotal * .07); // se calcula + el 7%.

    toPay.innerHTML = `
        <section>
            <div class="col-lg-12 mb-3 px-4 d-flex justify-content-between">
                <p class="d-inline">Sub Total</p>
                <p>B/. <span>${subTotal.toFixed(2)}</span></p>
            </div>
            <div class="col-lg-12 mb-3 px-4 d-flex justify-content-between">
                <p class="d-inline">+ Itbms</p>
                <p class="">7%</p>
            </div>
            <div class="col-lg-12 px-4 d-flex justify-content-between">
                <h4 class="d-inline">Total</h4>
                <h4>B/. <span name="priceTotal">${total.toFixed(2)}</span></h4>
            </div>
            <hr class="my-3">
        </section>

        <section>
            <div class="col-lg-12 mb-3">
                <p>¿Tienes algún cupón o tarjeta de regalo?</p>
            </div>
            <div class="col-lg-12">
                <p>¿Te falta algún curso? <a href="/tienda" class="font-weight-bold" style="color: #3763EB !important;">Sigue comprando</a></p>
            </div>
        </section>
        `
}

const removeProduct = e => {

    const id = e.target.dataset.id; // el 'id' está en el data set del botón.

    products.splice(id, 1); // se elimina el product en base a su id.
    setToCart(); // se reasigna el cart.
}