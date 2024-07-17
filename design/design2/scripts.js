// scripts.js
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
        deviceType: ["Router", "Switch", "Firewall", "Access Point"][Math.floor(Math.random() * 4)],
        manufacturer: ["Cisco", "HP", "Juniper", "Netgear"][Math.floor(Math.random() * 4)],
        deviceName: "Device " + Math.floor(Math.random() * 1000)
    }));

    // Populate the table
    const tableBody = document.getElementById("inventory-table-body");
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
            <td>${item.deviceType}</td>
            <td>${item.manufacturer}</td>
            <td>${item.deviceName}</td>
        `;

        tableBody.appendChild(row);
    });
});
