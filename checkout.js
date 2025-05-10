// DOM Elements
const orderItems = document.getElementById('order-items');
const orderSubtotal = document.getElementById('order-subtotal');
const orderDiscount = document.getElementById('order-discount');
const orderShipping = document.getElementById('order-shipping');
const orderTotal = document.getElementById('order-total');
const placeOrderBtn = document.getElementById('place-order-btn');
const confirmationModal = document.getElementById('confirmation-modal');
const closeConfirmationBtn = document.getElementById('close-confirmation');
const orderId = document.getElementById('order-id');
const confirmationEmail = document.getElementById('confirmation-email');
const deliveryDateSpan = document.getElementById('delivery-date');
const continueShoppingBtn = document.getElementById('continue-shopping-btn');
const standardDateSpan = document.getElementById('standard-date');
const expressDateSpan = document.getElementById('express-date');
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const cardPayment = document.getElementById('card-payment');
const upiPayment = document.getElementById('upi-payment');
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');

// Cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.isLoggedIn) {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html?redirect=checkout';
        return;
    }
    
    // Check if cart is empty
    if (cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }
    
    // Pre-fill user information if available
    if (currentUser) {
        document.getElementById('name').value = currentUser.name || '';
        document.getElementById('email').value = currentUser.email || '';
    }
    
    
    // Set delivery dates
    setDeliveryDates();
    
    // Render order items
    renderOrderItems();
    
    // Add event listeners
    placeOrderBtn.addEventListener('click', placeOrder);
    closeConfirmationBtn.addEventListener('click', closeConfirmation);
    continueShoppingBtn.addEventListener('click', continueShopping);
    
    // Add event listeners for payment options
    paymentOptions.forEach(option => {
        option.addEventListener('change', togglePaymentDetails);
    });
    
    // Add event listeners for delivery options
    deliveryOptions.forEach(option => {
        option.addEventListener('change', updateShippingCost);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            closeConfirmation();
        }
    });

    // Sign-out functionality
    const logOut = document.getElementById("log-out");
    if (logOut) {
        logOut.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });
    }
    
    
});

// Function to set delivery dates
function setDeliveryDates() {
    const today = new Date();
    
    // Standard delivery (3-5 days)
    const standardDate = new Date(today);
    standardDate.setDate(today.getDate() + 5);
    standardDateSpan.textContent = formatDate(standardDate);
    
    // Express delivery (1-2 days)
    const expressDate = new Date(today);
    expressDate.setDate(today.getDate() + 2);
    expressDateSpan.textContent = formatDate(expressDate);
}

// Function to format date
function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to render order items
function renderOrderItems() {
    orderItems.innerHTML = '';
    
    let subtotal = 0;
    let discount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemDiscount = (item.originalPrice - item.price) * item.quantity;
        
        subtotal += itemTotal;
        discount += itemDiscount;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details">
                <h4 class="order-item-title">${item.name}</h4>
                <p class="order-item-price">₹${item.price.toLocaleString()}</p>
                <p class="order-item-quantity">Quantity: ${item.quantity}</p>
            </div>
        `;
        
        orderItems.appendChild(orderItem);
    });
    
    // Update order summary
    updateOrderSummary(subtotal, discount);
}

// Function to update order summary
function updateOrderSummary(subtotal, discount) {
    // Get selected delivery option
    const selectedDelivery = document.querySelector('input[name="delivery"]:checked').value;
    let shipping = 0;
    
    // Set shipping cost based on delivery option
    if (selectedDelivery === 'express') {
        shipping = 100;
    } else if (selectedDelivery === 'same-day') {
        shipping = 200;
    }
    
    const total = subtotal - discount + shipping;
    
    // Update order summary
    orderSubtotal.textContent = `₹${subtotal.toLocaleString()}`;
    orderDiscount.textContent = `₹${discount.toLocaleString()}`;
    orderShipping.textContent = `₹${shipping.toLocaleString()}`;
    orderTotal.textContent = `₹${total.toLocaleString()}`;
}

// Function to update shipping cost
function updateShippingCost() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = cart.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
    
    updateOrderSummary(subtotal, discount);
}

// Function to toggle payment details
function togglePaymentDetails() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    if (selectedPayment === 'card') {
        cardPayment.style.display = 'block';
        upiPayment.style.display = 'none';
    } else if (selectedPayment === 'upi') {
        cardPayment.style.display = 'none';
        upiPayment.style.display = 'block';
    } else {
        cardPayment.style.display = 'none';
        upiPayment.style.display = 'none';
    }
}

// Function to place order
function placeOrder() {
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Validate form
    if (!validateCheckoutForm()) {
        return;
    }
    
    // Generate random order ID
    const randomOrderId = 'ORD' + Math.floor(Math.random() * 1000000);
    
    // Get selected delivery option
    const selectedDelivery = document.querySelector('input[name="delivery"]:checked').value;
    let deliveryDate;
    
    if (selectedDelivery === 'standard') {
        deliveryDate = standardDateSpan.textContent;
    } else if (selectedDelivery === 'express') {
        deliveryDate = expressDateSpan.textContent;
    } else {
        deliveryDate = 'Today';
    }
    
    // Calculate order totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = cart.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
    let shipping = 0;
    
    // Set shipping cost based on delivery option
    if (selectedDelivery === 'express') {
        shipping = 100;
    } else if (selectedDelivery === 'same-day') {
        shipping = 200;
    }
    
    // Save order to history
    saveOrderToHistory(randomOrderId, selectedDelivery, deliveryDate, subtotal, discount, shipping);
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    orderId.textContent = randomOrderId;
    confirmationEmail.textContent = email;
    deliveryDateSpan.textContent = deliveryDate;
    
    // Open confirmation modal
    confirmationModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to validate checkout form
function validateCheckoutForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    
    if (!name || !email || !phone || !address || !city || !pincode) {
        showNotification('Please fill in all required fields!');
        return false;
    }
    
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    if (selectedPayment === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || !expiry || !cvv) {
            showNotification('Please fill in all card details!');
            return false;
        }
    } else if (selectedPayment === 'upi') {
        const upiId = document.getElementById('upi-id').value;
        
        if (!upiId) {
            showNotification('Please enter UPI ID!');
            return false;
        }
    }
    
    return true;
}

// Function to save order to history
function saveOrderToHistory(orderId, deliveryType, deliveryDate, subtotal, discount, shipping) {
    // Get order history from localStorage
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
    const date = new Date();
    
    const order = {
        id: orderId,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        items: [...cart],
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        total: subtotal - discount + shipping,
        deliveryType: deliveryType,
        deliveryDate: deliveryDate,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
    };
    
    // Add to history
    orderHistory.unshift(order);
    
    // Save to localStorage
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

// Function to close confirmation modal
function closeConfirmation() {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Function to continue shopping
function continueShopping() {
    window.location.href = 'index.html';
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