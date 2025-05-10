// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Add event listeners
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Function to perform search
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    });
    
    // Update category links
    categoryLinks.forEach(link => link.classList.remove('active'));
    categoryLinks[0].classList.add('active'); // Set "All Products" as active
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <p>No products found for "<strong>${searchTerm}</strong>"</p>
            </div>
        `;
    } else {
        displayProducts(filteredProducts);
    }
    
    // Scroll to products section
    productsContainer.scrollIntoView({ behavior: 'smooth' });
}