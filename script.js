const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");

let shoppingCart = [];

// Save cart to local storage
function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

// Load cart from local storage
function loadCart() {

    const savedCart = localStorage.getItem("shoppingCart");

    if (savedCart) {
        shoppingCart = JSON.parse(savedCart);
    }

    renderCart();
}

// Update total price
function updateTotalPrice() {

    let totalPrice = 0;

    shoppingCart.forEach(product => {
        totalPrice += product.price * product.quantity;
    });

    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Render cart
function renderCart() {

    cart.innerHTML = "";

    shoppingCart.forEach((product, index) => {

        // Create list item
        const item = document.createElement("li");
        item.className =
            "list-group-item d-flex justify-content-between align-items-center cart-item";

        item.dataset.index = index;

        // Product text
        const productInfo = document.createElement("span");
        productInfo.className = "fw-semibold";
        productInfo.textContent = `${product.name} - $${product.price.toFixed(2)}`;

        // Quantity input
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.className = "form-control quantity-input";
        quantityInput.min = 1;
        quantityInput.value = product.quantity;

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger remove-btn";
        removeButton.textContent = "Remove";

        item.appendChild(productInfo);
        item.appendChild(quantityInput);
        item.appendChild(removeButton);

        cart.appendChild(item);

    });

    updateTotalPrice();
}

// Add Product
function addProduct() {

    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);

    // Validate input
    if (name === "") {
        alert("Please enter a product name.");
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price.");
        return;
    }

    shoppingCart.push({
        name: name,
        price: price,
        quantity: 1
    });

    saveCart();
    renderCart();

    // Clear inputs
    productNameInput.value = "";
    productPriceInput.value = "";

    productNameInput.focus();
}

// Add button event
addProductButton.addEventListener("click", addProduct);

// Allow Enter key
document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addProduct();
    }

});

// Update quantity
cart.addEventListener("change", function (event) {

    if (event.target.classList.contains("quantity-input")) {

        const item = event.target.closest("li");
        const index = item.dataset.index;

        let newQuantity = parseInt(event.target.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
            event.target.value = 1;
        }

        shoppingCart[index].quantity = newQuantity;

        saveCart();
        updateTotalPrice();
    }

});

// Remove item
cart.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-btn")) {

        const item = event.target.closest("li");
        const index = item.dataset.index;

        shoppingCart.splice(index, 1);

        saveCart();
        renderCart();
    }

});

// Load saved cart
loadCart();