// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartDiscount = document.getElementById('cart-discount');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart
function initCart() {
    updateCartCount();
    
    // Add event listeners
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', proceedToCheckout);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });
}

// Function to open cart modal
function openCart() {
    renderCartItems();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close cart modal
function closeCart() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Function to add product to cart
function addToCart(product) {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    saveCart();
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    // Save to localStorage
    saveCart();
    
    // Update cart count
    updateCartCount();
    
    // Re-render cart items
    renderCartItems();
}

// Function to update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = newQuantity;
        
        // Save to localStorage
        saveCart();
        
        // Re-render cart items
        renderCartItems();
    }
}

// Function to render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        updateCartSummary(0, 0, 0);
        return;
    }
    
    let subtotal = 0;
    let discount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemDiscount = (item.originalPrice - item.price) * item.quantity;
        
        subtotal += itemTotal;
        discount += itemDiscount;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'modal-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="modal-item-image">
            <div class="modal-item-details">
                <h4 class="modal-item-title">${item.name}</h4>
                <p class="modal-item-price">₹${item.price.toLocaleString()} x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}</p>
                <div class="modal-item-actions">
                    <div class="quantity-control">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        
        // Add event listeners to buttons
        const decreaseBtn = cartItem.querySelector('.decrease-quantity');
        const increaseBtn = cartItem.querySelector('.increase-quantity');
        const removeBtn = cartItem.querySelector('.remove-item');
        
        decreaseBtn.addEventListener('click', () => {
            updateQuantity(item.id, item.quantity - 1);
        });
        
        increaseBtn.addEventListener('click', () => {
            updateQuantity(item.id, item.quantity + 1);
        });
        
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });
    });
    
    // Update cart summary
    updateCartSummary(subtotal, discount, subtotal - discount);
}

// Function to update cart summary
function updateCartSummary(subtotal, discount, total) {
    cartSubtotal.textContent = `₹${subtotal.toLocaleString()}`;
    cartDiscount.textContent = `₹${discount.toLocaleString()}`;
    cartTotal.textContent = `₹${total.toLocaleString()}`;
}

// Function to update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to proceed to checkout
// Update the proceedToCheckout function
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser && currentUser.isLoggedIn) {
        // User is logged in, redirect to checkout page
        window.location.href = 'checkout.html';
    } else {
        // User is not logged in, redirect to login page
        showNotification('Please login to proceed with checkout');
        window.location.href = 'login.html?redirect=checkout';
        
    }
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Initialize cart on page load
initCart();
