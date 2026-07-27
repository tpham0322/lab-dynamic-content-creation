const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");

let totalPrice = 0;

// Update total price
function updateTotalPrice() {
    totalPriceSpan.textContent = totalPrice.toFixed(2);
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

    // Create list item
    const item = document.createElement("li");
    item.className =
        "list-group-item d-flex justify-content-between align-items-center cart-item";

    item.dataset.price = price;
    item.dataset.quantity = 1;

    // Product text
    const productInfo = document.createElement("span");
    productInfo.className = "fw-semibold";
    productInfo.textContent = `${name} - $${price.toFixed(2)}`;

    // Quantity input
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.className = "form-control quantity-input";
    quantityInput.min = 1;
    quantityInput.value = 1;

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger remove-btn";
    removeButton.textContent = "Remove";

    // Add initial price
    totalPrice += price;
    updateTotalPrice();

    item.appendChild(productInfo);
    item.appendChild(quantityInput);
    item.appendChild(removeButton);

    cart.appendChild(item);

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

// =========================
// Event Delegation - Remove
// =========================

cart.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-btn")) {

        const item = event.target.closest("li");

        const price = parseFloat(item.dataset.price);
        const quantity = parseInt(item.dataset.quantity);

        totalPrice -= price * quantity;

        updateTotalPrice();

        item.remove();
    }

});

// ===========================
// Event Delegation - Quantity
// ===========================

cart.addEventListener("change", function (event) {

    if (event.target.classList.contains("quantity-input")) {

        const quantityInput = event.target;
        const item = quantityInput.closest("li");

        let newQuantity = parseInt(quantityInput.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
            quantityInput.value = 1;
        }

        const oldQuantity = parseInt(item.dataset.quantity);
        const price = parseFloat(item.dataset.price);

        totalPrice -= price * oldQuantity;
        totalPrice += price * newQuantity;

        item.dataset.quantity = newQuantity;

        updateTotalPrice();
    }

});