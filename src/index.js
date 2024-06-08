// Helper function to clear existing content
function clearContent() {
    const content = document.querySelector('#content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

// Helper function to create and append new content
function createContent(headerText, bodyText) {
    clearContent();
    const header = document.createElement('h1');
    const paragraph = document.createElement('p');
    header.textContent = headerText;
    paragraph.textContent = bodyText;

    const content = document.querySelector('#content');
    content.appendChild(header);
    content.appendChild(paragraph);
}

// Add event listener to the entire navigation
const nav = document.querySelector('nav');
nav.addEventListener('click', function(event) {
    const buttonId = event.target.id;
    switch (buttonId) {
        case 'home':
            createContent('Welcome to the Home Page', 'This is the home page content.');
            break;
        case 'menu':
            createContent('Our Menu', 'Here is our menu list...');
            break;
        case 'about':
            createContent('About Us', 'Learn more about our story and mission.');
            break;
        default:
            clearContent(); // Clears content if an unknown button is clicked
    }
});
