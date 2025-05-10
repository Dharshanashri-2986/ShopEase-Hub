// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

// Initialize theme
function initTheme() {
    // Check if user has a preferred theme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        enableDarkTheme();
    }
    
    // Add event listener to theme toggle button
    themeToggle.addEventListener('click', toggleTheme);
}

// Function to toggle theme
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        disableDarkTheme();
    } else {
        enableDarkTheme();
    }
}

// Function to enable dark theme
function enableDarkTheme() {
    document.documentElement.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeStyle.removeAttribute('disabled');
    localStorage.setItem('theme', 'dark');
}

// Function to disable dark theme
function disableDarkTheme() {
    document.documentElement.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeStyle.setAttribute('disabled', true);
    localStorage.setItem('theme', 'light');
}

// Initialize theme on page load
initTheme();