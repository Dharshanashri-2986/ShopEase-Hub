// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryLinks = document.querySelectorAll('nav a');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Display all products initially
    displayProducts(products);
    
    // Add event listeners to category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            const category = link.getAttribute('data-category');
            
            if (category === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                displayProducts(filteredProducts);
            }
        });
    });
    const historyBtn = document.getElementById('history-btn');
    
    if (historyBtn) {
        historyBtn.addEventListener('click', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
            if (!currentUser.isLoggedIn) {
                console.log("User not logged in, redirecting to login...");
                window.location.href = 'login.html?redirect=history.html';
            } else {
                console.log("User logged in, redirecting to order history...");
                window.location.href = 'history.html';
            }
        });
    }

});

// Function to display products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Check if product is in wishlist
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                ${getRatingStars(product.rating)}
                <span>(${product.rating})</span>
            </div>
            <div class="product-price">
                <span class="current-price">₹${product.price.toLocaleString()}</span>
                <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                <span class="discount">${product.discount}% OFF</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="add-to-wishlist ${isInWishlist ? 'active' : ''}" data-id="${product.id}">
                    <i class="fas ${isInWishlist ? 'fa-heart' : 'fa-heart-o'}"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const addToCartBtn = card.querySelector('.add-to-cart');
    const addToWishlistBtn = card.querySelector('.add-to-wishlist');
    
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });
    
    addToWishlistBtn.addEventListener('click', () => {
        toggleWishlist(product);
        addToWishlistBtn.classList.toggle('active');
        const icon = addToWishlistBtn.querySelector('i');
        icon.classList.toggle('fa-heart-o');
        icon.classList.toggle('fa-heart');
    });
    
    return card;
}

// Function to generate rating stars
function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}