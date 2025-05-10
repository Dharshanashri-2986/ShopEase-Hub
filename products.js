// Product data
const products = [
    {
        id: 1,
        name: "Premium Running Shoes",
        category: "shoes",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        description: "Lightweight and comfortable running shoes with excellent cushioning and support."
    },
    {
        id: 2,
        name: "Casual Sneakers",
        category: "shoes",
        price: 1999,
        originalPrice: 2499,
        discount: 20,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        description: "Stylish casual sneakers perfect for everyday wear."
    },
    {
        id: 3,
        name: "Leather Wallet",
        category: "accessories",
        price: 899,
        originalPrice: 1299,
        discount: 30,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
        description: "Genuine leather wallet with multiple card slots and a coin pocket."
    },
    {
        id: 4,
        name: "Stainless Steel Watch",
        category: "accessories",
        price: 2499,
        originalPrice: 3499,
        discount: 28,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
        description: "Elegant stainless steel watch with a minimalist design."
    },
    {
        id: 5,
        name: "Laptop Backpack",
        category: "bags",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        description: "Spacious laptop backpack with multiple compartments and padded shoulder straps."
    },
    {
        id: 6,
        name: "Tote Bag",
        category: "bags",
        price: 999,
        originalPrice: 1299,
        discount: 23,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e",
        description: "Stylish and durable tote bag perfect for shopping or daily use."
    },
    {
        id: 7,
        name: "Cotton T-Shirt",
        category: "clothing",
        price: 599,
        originalPrice: 799,
        discount: 25,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description: "Comfortable cotton t-shirt available in multiple colors."
    },
    {
        id: 8,
        name: "Denim Jeans",
        category: "clothing",
        price: 1799,
        originalPrice: 2499,
        discount: 28,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        description: "Classic denim jeans with a comfortable fit."
    },
    {
        id: 9,
        name: "Wireless Earbuds",
        category: "electronics",
        price: 2999,
        originalPrice: 3999,
        discount: 25,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
        description: "High-quality wireless earbuds with noise cancellation."
    },
    {
        id: 10,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1999,
        originalPrice: 2499,
        discount: 20,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
        description: "Portable Bluetooth speaker with excellent sound quality."
    },
    {
        id: 11,
        name: "Formal Shoes",
        category: "shoes",
        price: 2499,
        originalPrice: 3499,
        discount: 28,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
        description: "Elegant formal shoes made from genuine leather."
    },
    {
        id: 12,
        name: "Sunglasses",
        category: "accessories",
        price: 1299,
        originalPrice: 1799,
        discount: 27,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
        description: "Stylish sunglasses with UV protection."
    },
    {
        id: 13,
        name: "Crossbody Bag",
        category: "bags",
        price: 1299,
        originalPrice: 1699,
        discount: 23,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6",
        description: "Compact crossbody bag with adjustable strap."
    },
    {
        id: 14,
        name: "Formal Shirt",
        category: "clothing",
        price: 1199,
        originalPrice: 1599,
        discount: 25,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
        description: "Crisp formal shirt perfect for office wear."
    },
    {
        id: 15,
        name: "Smartphone",
        category: "electronics",
        price: 14999,
        originalPrice: 17999,
        discount: 16,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        description: "Feature-packed smartphone with an excellent camera."
    },
    {
        id: 16,
        name: "Sports Shoes",
        category: "shoes",
        price: 2799,
        originalPrice: 3499,
        discount: 20,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
        description: "High-performance sports shoes for various activities."
    },
    {
        id: 17,
        name: "Beaded Bracelet",
        category: "accessories",
        price: 499,
        originalPrice: 699,
        discount: 28,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0",
        description: "Handcrafted beaded bracelet with an adjustable clasp."
    },
    {
        id: 18,
        name: "Travel Duffel Bag",
        category: "bags",
        price: 1899,
        originalPrice: 2499,
        discount: 24,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        description: "Spacious duffel bag perfect for weekend getaways."
    },
    {
        id: 19,
        name: "Hooded Sweatshirt",
        category: "clothing",
        price: 1299,
        originalPrice: 1699,
        discount: 23,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        description: "Comfortable hooded sweatshirt for casual wear."
    },
    {
        id: 20,
        name: "Wireless Headphones",
        category: "electronics",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description: "Premium wireless headphones with excellent sound quality."
    }
];