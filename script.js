let cesta = JSON.parse(localStorage.getItem("cesta")) || [];
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const btnOrder = document.getElementById("btn-order");
const btnClear = document.getElementById("btn-clear");

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add")) {
        const product = e.target.closest(".product");
        const size = product.dataset.size;
        const price = parseFloat(product.dataset.price);

        agregarACesta(size, price);
    }
});

function agregarACesta(size, price) {
    cesta.push({ size, price });
    guardarCesta();
    renderizarCesta();
}

function renderizarCesta() {
    cartList.innerHTML = "";
    let total = 0;

    cesta.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.size} - ${item.price}€`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Eliminar";
        removeBtn.onclick = () => eliminarDeCesta(index);
        li.appendChild(removeBtn);
        cartList.appendChild(li);

        total += item.price;
    });

    cartTotal.textContent = `Total: ${total.toFixed(2)}€`;
    btnOrder.disabled = cesta.length === 0;
}

function guardarCesta() {
    localStorage.setItem("cesta", JSON.stringify(cesta));
}

function eliminarDeCesta(index) {
    cesta.splice(index, 1);
    guardarCesta();
    renderizarCesta();
}

btnClear.addEventListener("click", () => {
    cesta = [];
    guardarCesta();
    renderizarCesta();
});

renderizarCesta();
