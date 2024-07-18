import './styles.css';
import WebFont from 'webfontloader';
import '@fortawesome/fontawesome-free/css/all.min.css';

WebFont.load({
    google: {
        families: ['Roboto:400,700']
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Function to generate random IP address
    function getRandomIp() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

    // Function to generate random MAC address
    function getRandomMac() {
        return '00:1A:2B:' + Array(3).fill(0).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
    }

    // Mock data generation
    const inventoryData = Array.from({ length: 200 }, () => ({
        ipAddress: getRandomIp(),
        macAddress: getRandomMac(),
        mainOffice: "Headquarters",
        subOffice: "Branch " + String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Random branch from A-Z
        deviceType: ["Computer", "Printer", "Phone", "Tablet", "PDU"][Math.floor(Math.random() * 5)],
        manufacturer: ["Cisco", "HP", "Juniper", "Netgear"][Math.floor(Math.random() * 4)],
        deviceName: "Device " + Math.floor(Math.random() * 1000)
    }));

    // Function to get the appropriate icon based on device type
    function getDeviceIcon(type) {
        switch (type) {
            case 'Computer': return '<i class="fas fa-desktop"></i>';
            case 'Printer': return '<i class="fas fa-print"></i>';
            case 'Phone': return '<i class="fas fa-phone"></i>';
            case 'Tablet': return '<i class="fas fa-tablet-alt"></i>';
            case 'PDU': return '<i class="fas fa-plug"></i>';
            default: return '';
        }
    }

    // Populate the table
    function populateTable(sectionId) {
        const tableBody = document.querySelector(`#${sectionId} tbody`);
        tableBody.innerHTML = ''; // Clear previous data

        inventoryData.forEach((item, index) => {
            const row = document.createElement("tr");

            // Apply conditional coloring
            if (item.deviceType === "Router") {
                row.classList.add('alert');
            } else if (item.deviceType === "Switch") {
                row.classList.add('warning');
            }

            row.innerHTML = `
                <td>${item.ipAddress}</td>
                <td>${item.macAddress}</td>
                <td>${item.mainOffice}</td>
                <td>${item.subOffice}</td>
                <td>${getDeviceIcon(item.deviceType)} ${item.deviceType}</td>
                <td>${item.manufacturer}</td>
                <td>${item.deviceName}</td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Handle navigation and dashboard clicks
    function handleNavigation(event) {
        const targetId = event.target.getAttribute('data-target');
        if (targetId) {
            document.querySelectorAll('main > section').forEach(section => section.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');
            if (targetId !== 'dashboard-section') {
                populateTable(targetId);
            }
        }
    }

    // Attach event listeners to navigation links and dashboard items
    document.querySelectorAll('.sub-nav a, .dashboard-item, .top-bar .logo, .top-bar-right i').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });

    // Initially show the dashboard section
    document.getElementById('dashboard-section').classList.remove('hidden');
});
