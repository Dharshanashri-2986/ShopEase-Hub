// DOM Elements
const wishlistBtn = document.getElementById('wishlist-btn');
const wishlistModal = document.getElementById('wishlist-modal');
const closeWishlistBtn = document.getElementById('close-wishlist');
const wishlistItems = document.getElementById('wishlist-items');
const wishlistCount = document.getElementById('wishlist-count');

// Wishlist data
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Initialize wishlist
function initWishlist() {
    updateWishlistCount();
    
    // Add event listeners
    wishlistBtn.addEventListener('click', openWishlist);
    closeWishlistBtn.addEventListener('click', closeWishlist);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === wishlistModal) {
            closeWishlist();
        }
    });
}

// Function to open wishlist modal
function openWishlist() {
    renderWishlistItems();
    wishlistModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close wishlist modal
function closeWishlist() {
    wishlistModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Function to toggle product in wishlist
function toggleWishlist(product) {
    const index = wishlist.findIndex(item => item.id === product.id);
    
    if (index !== -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showNotification(`${product.name} removed from wishlist!`);
    } else {
        // Add to wishlist
        wishlist.push(product);
        showNotification(`${product.name} added to wishlist!`);
    }
    
    // Save to localStorage
    saveWishlist();
    
    // Update wishlist count
    updateWishlistCount();
}

// Function to render wishlist items
function renderWishlistItems() {
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<p class="text-center">Your wishlist is empty</p>';
        return;
    }
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'modal-item';
        
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="modal-item-image">
            <div class="modal-item-details">
                <h4 class="modal-item-title">${item.name}</h4>
                <p class="modal-item-price">₹${item.price.toLocaleString()}</p>
                <div class="modal-item-actions">
                    <button class="add-to-cart-from-wishlist" data-id="${item.id}">Add to Cart</button>
                    <button class="remove-from-wishlist" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        
        wishlistItems.appendChild(wishlistItem);
        
        // Add event listeners to buttons
        const addToCartBtn = wishlistItem.querySelector('.add-to-cart-from-wishlist');
        const removeBtn = wishlistItem.querySelector('.remove-from-wishlist');
        
        addToCartBtn.addEventListener('click', () => {
            addToCart(item);
        });
        
        removeBtn.addEventListener('click', () => {
            toggleWishlist(item);
            renderWishlistItems();
        });
    });
}

// Function to update wishlist count
function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
}

// Function to save wishlist to localStorage
function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Initialize wishlist on page load
initWishlist();