// homeTab.js

// Define the function separately
function homeTab() {
    
    const header = document.createElement('h1');
    const paragraph = document.createElement('p');
    header.textContent = 'Welcome to the Home Page through git';
    paragraph.textContent = 'This is the home page content.';

    content.appendChild(header);
    content.appendChild(paragraph);
}

// Export the function at the end of the module
export { homeTab };
