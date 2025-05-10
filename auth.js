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

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.getElementById('name').value = currentUser.name || '';
    document.getElementById('email').value = currentUser.email || '';
}

document.addEventListener("DOMContentLoaded", function () {
    const authBtn = document.getElementById("auth-btn");
    
    // Hardcoded credentials
    const hardcodedEmail1 = "priyadharshika0207@gmail.com";
    const hardcodedPassword1 = "Priya@123";
    const hardcodedEmail2 = "dharshanashris133@gmail.com";
    const hardcodedPassword2 = "Dharshana@123";
    const hardcodedEmail3 = "abinayan5326@gmail.com";
    const hardcodedPassword3 = "Abinayan@123";
    

    // Login Form Handling
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("login-email").value.trim().toLowerCase();
            const password = document.getElementById("login-password").value;

            if ((email === hardcodedEmail1 && password === hardcodedPassword1) ||
                (email === hardcodedEmail2 && password === hardcodedPassword2) || 
                (email === hardcodedEmail3 && password === hardcodedPassword3)) {
                     
                
                loginMessage.textContent = "Login successful! Redirecting...";
                loginMessage.style.color = "green";

                // Store session
                localStorage.setItem("currentUser", JSON.stringify({ email, isLoggedIn: true }));

                // Redirect to checkout page
                setTimeout(() => {
                    window.location.href = "checkout.html";
                }, 1000);
            } else {
                alert("Invalid email or password!");
                loginMessage.textContent = "";
            }
        });
    }
});


