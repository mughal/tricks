import {homeTab} from './homeTab.js';
import {menuTab} from './menuTab.js';
import {aboutTab} from './aboutTab.js';

// Helper function to clear existing content
function clearContent() {
    const content = document.querySelector('#content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

// Add event listener to the entire navigation
const nav = document.querySelector('nav');
clearContent();
nav.addEventListener('click', function(event) {
    const buttonId = event.target.id;
    switch (buttonId) {
        case 'home':
            clearContent();
            homeTab();
            break;
        case 'menu':
            clearContent();
            menuTab();
            break;
        case 'about':
            clearContent();
            aboutTab();
            break;
        default:
            clearContent(); // Clears content if an unknown button is clicked
    }
});
