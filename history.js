// DOM Elements
const historyItems = document.getElementById('history-items');
const noOrders = document.getElementById('no-orders');

// Initialize order history page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.isLoggedIn) {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html?redirect=order-history';
        return;
    }
    
    // Render order history
    renderOrderHistory();
});

// Function to render order history
function renderOrderHistory() {
    // Get order history from localStorage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
    // Check if there are any orders
    if (orderHistory.length === 0) {
        historyItems.style.display = 'none';
        noOrders.style.display = 'block';
        return;
    }
    
    // Clear loading text
    clearHistoryBtn.style.display = 'block';
    historyItems.innerHTML = '';
    
    // Render each order
    orderHistory.forEach(order => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        // Format date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create order header
        const header = document.createElement('div');
        header.className = 'history-item-header';
        header.innerHTML = `
            <div>
                <h4>Order ID: ${order.id}</h4>
                <p>Date: ${formattedDate}</p>
                <p>Delivery: ${order.deliveryDate || 'Not specified'}</p>
            </div>
            <div>
                <p>Total: ₹${order.total ? order.total.toLocaleString() : 'N/A'}</p>
                <p>Payment: ${getPaymentMethodName(order.paymentMethod)}</p>
                <p>Status: <span class="order-status">Delivered</span></p>
            </div>
        `;
        
        // Create order products section
        const productsSection = document.createElement('div');
        productsSection.className = 'history-item-products';
        productsSection.innerHTML = `<h5>Products:</h5>`;
        
        // Add each product
        order.items.forEach(item => {
            const product = document.createElement('div');
            product.className = 'history-product';
            product.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="history-product-image">
                <div class="history-product-details">
                    <p><strong>${item.name}</strong> x ${item.quantity}</p>
                    <p>₹${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            `;
            productsSection.appendChild(product);
        });
        
        // Create order summary
        const summary = document.createElement('div');
        summary.className = 'history-summary';
        summary.innerHTML = `
            <div class="history-summary-row">
                <span>Subtotal:</span>
                <span>₹${order.subtotal ? order.subtotal.toLocaleString() : 'N/A'}</span>
            </div>
            <div class="history-summary-row">
                <span>Discount:</span>
                <span>₹${order.discount ? order.discount.toLocaleString() : 'N/A'}</span>
            </div>
            <div class="history-summary-row">
                <span>Shipping:</span>
                <span>₹${order.shipping ? order.shipping.toLocaleString() : 'N/A'}</span>
            </div>
            <div class="history-summary-row total">
                <span>Total:</span>
                <span>₹${order.total ? order.total.toLocaleString() : 'N/A'}</span>
            </div>
        `;
        
        // Append all sections to the history item
        historyItem.appendChild(header);
        historyItem.appendChild(productsSection);
        historyItem.appendChild(summary);
        
        // Append history item to the container
        historyItems.appendChild(historyItem);
    });
}

// Function to get payment method name
function getPaymentMethodName(method) {
    switch (method) {
        case 'card':
            return 'Credit/Debit Card';
        case 'upi':
            return 'UPI';
        case 'cod':
            return 'Cash on Delivery';
        default:
            return method || 'Not specified';
    }
}

// Get the clear history button
const clearHistoryBtn = document.getElementById('clear-history-btn');

// Function to clear order history
function clearOrderHistory() {
    localStorage.removeItem('orderHistory'); // Remove history from local storage
    alert("Purchase history cleared!");
    renderOrderHistory(); // Refresh the history display
}

// Attach event listener to the button
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', clearOrderHistory);
}
