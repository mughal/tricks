// src/features/device/device.js

import './device.css';  // Ensure the relative path to your CSS file is correct

// Function to fetch the acknowledgment form and prepare it for display
export function ackMac() {
    return fetch('http://localhost:3000/static/forms/deviceForm.html')  // Adjust URL as needed
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load the form');
            }
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            return doc.body.firstChild;  // Assuming the form is the first child in the HTML document
        });
}
