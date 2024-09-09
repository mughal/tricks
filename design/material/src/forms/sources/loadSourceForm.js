// Function to create the form dynamically and append it to the content area
export function loadSourceForm() {
    // Get the content area where the form will be displayed
    const content = document.getElementById('content-id');
    
    // Clear existing content
    content.innerHTML = '';

    // Create the form container
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';

    // Create the form element
    const form = document.createElement('form');
    form.id = 'updateForm';
    form.className = 'update-form';

    // Create and append form fields dynamically
    form.innerHTML = `
        <h2 class="form-header">Update Source Information</h2>
        <div class="form-group">
            <label for="source_ip">Source IP:</label>
            <input type="text" id="source_ip" name="source_ip" class="form-input" placeholder="Enter source IP">
            <button type="button" id="fetch-button">Fetch Data</button> <!-- Changed to use an ID -->
        </div>
        <div class="form-group">
            <label for="main_office">Main Office:</label>
            <input type="text" id="main_office" name="main_office" class="form-input" placeholder="Enter main office" required>
        </div>
        <div class="form-group">
            <label for="community_string">Community String:</label>
            <input type="text" id="community_string" name="community_string" class="form-input" placeholder="Enter community string" required>
        </div>
        <div class="form-group">
            <label for="region">Region:</label>
            <input type="text" id="region" name="region" class="form-input" placeholder="Enter region" required>
        </div>
        <div class="form-group">
            <label for="location">Location:</label>
            <input type="text" id="location" name="location" class="form-input" placeholder="Enter location" required>
        </div>
        <div class="form-group">
            <label for="OID">OID:</label>
            <input type="text" id="OID" name="OID" class="form-input" placeholder="Enter OID" required>
        </div>
        <div class="form-group">
            <label for="active">Active:</label>
            <select id="active" name="active" class="form-input">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
            </select>
        </div>
        <div class="form-group">
            <button type="button" id="submit-button" class="submit-button">Update Source</button> <!-- Changed to use an ID -->
        </div>
    `;

    // Append the form to the form container
    formContainer.appendChild(form);

    // Append the form container to the content area
    content.appendChild(formContainer);

    // Add event listeners to buttons after the form is added to the DOM
    document.getElementById('fetch-button').addEventListener('click', fetchSourceData); // Fetch data button
    document.getElementById('submit-button').addEventListener('click', submitForm); // Submit form button
}

// Function to fetch data based on source IP
async function fetchSourceData() {
    const sourceIP = document.getElementById('source_ip').value.trim();
    if (!sourceIP) {
        alert('Please enter a source IP.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/source?source_ip=${sourceIP}`);
        if (!response.ok) {
            alert('Source not found or server error.');
            return;
        }

        const data = await response.json();

        // Populate the form with fetched data
        document.getElementById('main_office').value = data.main_office;
        document.getElementById('community_string').value = data.community_string;
        document.getElementById('region').value = data.region;
        document.getElementById('location').value = data.location;
        document.getElementById('OID').value = data.OID;
        document.getElementById('active').value = data.active.toString();
        document.getElementById('source_ip').readOnly = true;
    } catch (error) {
        console.error('Error fetching source data:', error);
        alert('Failed to fetch source data. Please try again.');
    }
}

// Function to submit the form data to the backend
async function submitForm() {
    const sourceIP = document.getElementById('source_ip').value.trim();
    const mainOffice = document.getElementById('main_office').value.trim();
    const communityString = document.getElementById('community_string').value.trim();
    const region = document.getElementById('region').value.trim();
    const location = document.getElementById('location').value.trim();
    const OID = document.getElementById('OID').value.trim();
    const active = document.getElementById('active').value === 'true';

    if (!sourceIP) {
        alert('Source IP is required.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/source', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source_ip: sourceIP,
                main_office: mainOffice,
                community_string: communityString,
                region,
                location,
                OID,
                active
            })
        });

        if (!response.ok) {
            alert('Failed to update source. Please try again.');
            return;
        }

        alert('Source updated successfully!');
    } catch (error) {
        console.error('Error updating source:', error);
        alert('Failed to update source. Please try again.');
    }
}
