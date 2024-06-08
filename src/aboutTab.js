// aboutTab.js

// Define the function separately
function aboutTab() {
    
    const header = document.createElement('h1');
    const paragraph = document.createElement('p');
    header.textContent = 'Welcome to the About Page';
    paragraph.textContent = 'This is the About page content.';

    content.appendChild(header);
    content.appendChild(paragraph);
}

// Export the function at the end of the module
export { aboutTab };
