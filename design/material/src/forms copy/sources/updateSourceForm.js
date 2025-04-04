// src/feature/forms/updateSourceForm.js

import './updateSourceForm.css';
import { getCuriozityURL } from '../../features/controlVars.js'; 
// Function to open the update source form dialog
export function updateSourceForm(initialData = {}) {
    let dialog = document.getElementById('update-source-dialog');

    // If the dialog doesn't exist, create it
    if (!dialog) {
        // Create the dialog element
        dialog = document.createElement('dialog');
        dialog.id = 'update-source-dialog';

        // Your HTML content as a JavaScript string
        const dialogHTML = `
            <form id="source-form">
                <div class="checkbox-container">
                    <div class="source_ip">
                        Source IP: <span id="source-ip-display"></span>
                    </div>
                    <label>
                        <input type="checkbox" id="source_active" name="source_active">
                        Active
                    </label>
                </div>
                <div class="input-container">
                    <input type="text" id="snmp_oid" name="snmp_oid" placeholder=" " required>
                    <label for="snmp_oid">SNMP OID</label>
                </div>
                <div class="input-container">
                    <input type="text" id="location" name="location" placeholder=" " required>
                    <label for="location">Location</label>
                </div>
                <div class="input-container">
                    <input type="text" id="region" name="region" placeholder=" " required>
                    <label for="region">Region</label>
                </div>
                <div class="input-container">
                    <input type="text" id="main_office" name="main_office" placeholder=" ">
                    <label for="main_office">Main Office</label>
                </div>
                <!-- Action Buttons -->
                <div class="action-buttons"> 
                    <button class="submit-button" type="submit">Update Source</button>
                     <button  class="submit-button" type="button" id="cancel-button">Cancel</button>
                </div>
            </form>
        `;

        // Set the innerHTML of the dialog
        dialog.innerHTML = dialogHTML;

        // Append the dialog to the body
        document.body.appendChild(dialog);

    
        // Set up event listeners after the dialog is added to the DOM
        setupDialogEventListeners(dialog);
    }

    // Populate the form with initial data
    populateFormData(dialog, initialData);

    // Show the dialog
    dialog.showModal();
}

// Function to populate form data
function populateFormData(dialog, data) {
    const {
        location = '',
        region = '',
        main_office = ''
    } = data;

    const source_ip = data.source;
    const source_active = data.active;
    const snmp_oid = data.OID;


    // Set the source IP display
    const sourceIpDisplay = dialog.querySelector('#source-ip-display');
    sourceIpDisplay.textContent = source_ip;

    // Set form fields
    dialog.querySelector('#source_active').checked = source_active;
    dialog.querySelector('#snmp_oid').value = snmp_oid;
    dialog.querySelector('#location').value = location;
    dialog.querySelector('#region').value = region;
    dialog.querySelector('#main_office').value = main_office;
}

// Function to set up event listeners for the dialog
function setupDialogEventListeners(dialog) {
    const form = dialog.querySelector('#source-form');
    const cancelButton = dialog.querySelector('#cancel-button');

    // Form submission handler
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            source_ip: dialog.querySelector('#source-ip-display').textContent.trim(),
            source_active: dialog.querySelector('#source_active').checked,
            snmp_oid: dialog.querySelector('#snmp_oid').value,
            location: dialog.querySelector('#location').value,
            region: dialog.querySelector('#region').value,
            main_office: dialog.querySelector('#main_office').value
        };

        // Send data to the API
        submitFormData(formData, dialog);
    });

    // Cancel button handler
    cancelButton.addEventListener('click', function () {
        dialog.close();
    });
}

// Function to submit form data to your API
function submitFormData(formData, dialog) {
    // Replace '/api/updateSource' with your actual API endpoint
    // const response = await fetch(`${getCuriozityURL()}/api/logout`, {  // Updated the path to include /api
    //     method: 'POST',
    //     credentials: 'include' // Ensure cookies are included in the request
    // });
    const updateURL = getCuriozityURL();
    // alert(updateURL);
    // alert(JSON.stringify(formData));
    //return;
    

    fetch(`${getCuriozityURL()}/api/source`, {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included in the request
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                // Handle success
                alert('Source updated successfully.');
                // Close the dialog
                dialog.close();
            } else {
                // Handle server errors
                response.text().then(text => {
                    alert('Error updating source: ' + text);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error updating source.');
        });
}
