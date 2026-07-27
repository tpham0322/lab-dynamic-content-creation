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
    quantityInput.className = "form-control";
    quantityInput.min = 1;
    quantityInput.value = 1;

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger";
    removeButton.textContent = "Remove";

    // Add initial price
    totalPrice += price;
    updateTotalPrice();

    // Update quantity
    quantityInput.addEventListener("change", function () {

        let newQuantity = parseInt(quantityInput.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
            quantityInput.value = 1;
        }

        const oldQuantity = parseInt(item.dataset.quantity);

        totalPrice -= price * oldQuantity;
        totalPrice += price * newQuantity;

        item.dataset.quantity = newQuantity;

        updateTotalPrice();
    });

    // Remove item
    removeButton.addEventListener("click", function () {

        const quantity = parseInt(item.dataset.quantity);

        totalPrice -= price * quantity;

        updateTotalPrice();

        item.remove();

    });

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