// DOM Elements
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const cardPayment = document.getElementById('card-payment');
const upiPayment = document.getElementById('upi-payment');
const confirmationModal = document.getElementById('confirmation-modal');
const closeConfirmationBtn = document.getElementById('close-confirmation');
const orderId = document.getElementById('order-id');
const confirmationEmail = document.getElementById('confirmation-email');
const continueShoppingBtn = document.getElementById('continue-shopping-btn');

// Initialize
function initPayment() {
    // Add event listeners for payment options
    paymentOptions.forEach(option => {
        option.addEventListener('change', togglePaymentDetails);
    });
    
    // Add event listeners for confirmation modal
    closeConfirmationBtn.addEventListener('click', closeConfirmation);
    continueShoppingBtn.addEventListener('click', continueShopping);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            closeConfirmation();
        }
    });
}

// Function to toggle payment details based on selected option
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
    
    // Save order to history
    saveOrderToHistory(randomOrderId);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Show confirmation
    orderId.textContent = randomOrderId;
    confirmationEmail.textContent = email;
    
    // Close checkout modal and open confirmation modal
    closeCheckout();
    confirmationModal.style.display = 'block';
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

// Function to close confirmation modal
function closeConfirmation() {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Function to continue shopping
function continueShopping() {
    closeConfirmation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize payment on page load
initPayment();