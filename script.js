// Get products from localStorage or set default product data
let products = JSON.parse(localStorage.getItem('products')) || [
  { id: 1, name: 'Product A', shelf: 'Shelf 1', quantity: 50 },
  { id: 2, name: 'Product B', shelf: 'Shelf 2', quantity: 30 },
  { id: 3, name: 'Product C', shelf: 'Shelf 3', quantity: 15 }
];

// Display all products initially
const productList = document.getElementById('product-list');

function displayProducts(productsToDisplay) {
  productList.innerHTML = ''; // Clear previous content
  productsToDisplay.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-md', 'transition', 'duration-300', 'ease-in-out', 'hover:shadow-lg');

    productElement.innerHTML = `
      <h2 class="text-xl font-semibold mb-2 text-gray-800">${product.name}</h2>
      <p class="text-gray-600 mb-2"><span class="font-medium">Shelf:</span> ${product.shelf}</p>
      <div class="flex items-center">
        <span class="font-medium text-gray-600 mr-2">Quantity:</span>
        <input type="number" value="${product.quantity}" onchange="updateQuantity(${product.id}, this.value)" class="border rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
      </div>
    `;

    productList.appendChild(productElement);
  });
}

// Display all products initially
displayProducts(products);

// Search products
document.getElementById('search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
});

// Update quantity
function updateQuantity(id, newQuantity) {
  const product = products.find(p => p.id === id);
  if (product) {
    product.quantity = parseInt(newQuantity, 10);
    saveToLocalStorage();
  }
}

// Add new product
function addProduct() {
  const name = document.getElementById('new-product-name').value;
  const shelf = document.getElementById('new-product-shelf').value;
  const quantity = document.getElementById('new-product-quantity').value;

  // Basic validation to ensure inputs are not empty
  if (name && shelf && quantity) {
    // Create new product object
    const newProduct = {
      id: products.length + 1, // Unique ID for each product
      name: name,
      shelf: shelf,
      quantity: parseInt(quantity, 10)
    };

    // Add the new product to the products array
    products.push(newProduct);

    // Clear the input fields
    document.getElementById('new-product-name').value = '';
    document.getElementById('new-product-shelf').value = '';
    document.getElementById('new-product-quantity').value = '';

    // Re-display the product list with the newly added product
    displayProducts(products);

    // Save the updated product list to localStorage
    saveToLocalStorage();
  } else {
    alert('Please fill out all fields.');
  }
}

// Save products to localStorage
function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}
