// Sample phone data
const phones = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "Galaxy S24 Ultra",
        price: 1199.99,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Google Pixel 8 Pro",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "OnePlus 12",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500&auto=format&fit=crop&q=60"
    }
];


let cart = [];


// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartIconBtn = document.getElementById('cart-icon-btn');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');


// Render Products to Shop
function displayProducts() {
    productGrid.innerHTML = phones.map(phone => `
        <div class="product-card">
            <img src="${phone.image}" alt="${phone.name}">
            <h3>${phone.name}</h3>
            <div class="product-price">$${phone.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${phone.id})">Add to Cart</button>
        </div>
    `).join('');
}


// Add Item to Cart
function addToCart(id) {
    const product = phones.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);


    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }


    updateCart();
    openCartSidebar();
}


// Remove Item from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}


// Update Cart DOM and Calculation
function updateCart() {
    // Update count icon
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;


    // Render cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888;">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
                </div>
                <i class="fa-solid fa-trash-can remove-item" onclick="removeFromCart(${item.id})"></i>
            </div>
        `).join('');
    }


    // Update total price
    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.innerText = `$${totalSum.toFixed(2)}`;
}


// Toggle Sidebar Functions
function openCartSidebar() {
    cartSidebar.classList.add('open');
}


cartIconBtn.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
});


closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});


// Initialize Setup
displayProducts();
updateCart();

