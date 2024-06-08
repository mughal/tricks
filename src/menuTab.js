// menuTab.js

// Define the function separately
function menuTab() {
    
    const header = document.createElement('h1');
    const paragraph = document.createElement('p');
    header.textContent = 'Welcome to the Menu Page';
    paragraph.textContent = 'This is the Menu page content.';

    content.appendChild(header);
    content.appendChild(paragraph);
}

// Export the function at the end of the module
export { menuTab };
