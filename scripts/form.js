// Product array for the select options
const products = [
    { id: 1, name: "Smart Thermostat" },
    { id: 2, name: "Wireless Security Camera" },
    { id: 3, name: "Robot Vacuum Cleaner" },
    { id: 4, name: "Air Purifier" },
    { id: 5, name: "Smart Door Lock" },
    { id: 6, name: "Wireless Earbuds" },
    { id: 7, name: "Portable Bluetooth Speaker" },
    { id: 8, name: "Smart Light Bulbs" }
];

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the form page
    const productSelect = document.getElementById('product');
    if (productSelect) {
        // Populate the product select options
        populateProductOptions();
    }

    // Check if we're on the review confirmation page
    if (window.location.pathname.includes('review.html')) {
        // Increment the review counter
        incrementReviewCounter();
        // Display the review counter
        displayReviewCounter();
        // Display the form data
        displayFormData();
    }
});

// Function to populate the product select options
function populateProductOptions() {
    const productSelect = document.getElementById('product');

    // Add each product as an option
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name; // Using the product name as the value
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Function to increment the review counter in localStorage
function incrementReviewCounter() {
    // Get the current count from localStorage or initialize to 0 if it doesn't exist
    let reviewCount = localStorage.getItem('reviewCount');

    // Convert to number or initialize to 0
    reviewCount = reviewCount ? parseInt(reviewCount) : 0;

    // Increment the count
    reviewCount++;

    // Save back to localStorage
    localStorage.setItem('reviewCount', reviewCount);
}

// Function to display the review counter
function displayReviewCounter() {
    // Get the current count from localStorage
    const reviewCount = localStorage.getItem('reviewCount') || 0;

    // Create or update the counter element
    const counterElement = document.getElementById('review-counter') || document.createElement('div');
    counterElement.id = 'review-counter';
    counterElement.innerHTML = `<p>You have submitted ${reviewCount} review${reviewCount !== 1 ? 's' : ''}.</p>`;

    // Add to the page if it doesn't exist yet
    if (!document.getElementById('review-counter')) {
        const main = document.querySelector('main');
        if (main) {
            main.prepend(counterElement);
        }
    }
}

// Function to display the form data on the review.html page
function displayFormData() {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);

    // Create a container for the review data
    const reviewDataElement = document.getElementById('review-data') || document.createElement('div');
    reviewDataElement.id = 'review-data';
    reviewDataElement.className = 'review-data';

    // Build the HTML for the review data
    let reviewHTML = '<h2>Your Review</h2>';

    // Product
    const product = params.get('product');
    if (product) {
        reviewHTML += `<p><strong>Product:</strong> ${product}</p>`;
    }

    // Rating
    const rating = params.get('rating');
    if (rating) {
        reviewHTML += `<p><strong>Rating:</strong> ${rating} star${rating !== '1' ? 's' : ''}</p>`;
    }

    // Installation Date
    const installDate = params.get('installation-date');
    if (installDate) {
        // Format the date nicely
        const date = new Date(installDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        reviewHTML += `<p><strong>Installation Date:</strong> ${formattedDate}</p>`;
    }

    // Useful Features
    const features = params.getAll('features');
    if (features && features.length > 0) {
        reviewHTML += `<p><strong>Useful Features:</strong></p><ul>`;
        features.forEach(feature => {
            reviewHTML += `<li>${feature}</li>`;
        });
        reviewHTML += `</ul>`;
    }

    // Written Review
    const review = params.get('review');
    if (review) {
        reviewHTML += `<p><strong>Your Review:</strong></p><p>${review}</p>`;
    }

    // Username
    const username = params.get('username');
    if (username) {
        reviewHTML += `<p><strong>Submitted by:</strong> ${username}</p>`;
    }

    // Set the HTML content
    reviewDataElement.innerHTML = reviewHTML;

    // Add to the page if it doesn't exist yet
    if (!document.getElementById('review-data')) {
        const main = document.querySelector('main');
        if (main) {
            main.appendChild(reviewDataElement);
        }
    }
}