// scripts.js
document.addEventListener("DOMContentLoaded", function () {
    // Mock data
    const data = {
        macAddress: "00:1A:2B:3C:4D:5E",
        ipAddress: "192.168.0.1",
        owner: "John Doe", // or "Unavailable"
        region: "North America",
        branchOffice: "Type 1",
        source: "Inventory", // or "Network"
        poNumber: "PO123456",
        deliveryDate: "2022-01-01",
        issueDate: "2022-02-01",
        history: [
            "Moved to Branch Office Type 1 on 2023-01-01",
            "Assigned to John Doe on 2022-02-01"
        ],
        logs: [
            "IP appeared in logs on 2023-07-10",
            "IP appeared in logs on 2023-07-11"
        ]
    };

    // Fill in the data
    document.getElementById("mac-address").textContent = data.macAddress;
    document.getElementById("ip-address").textContent = data.ipAddress;
    document.getElementById("owner").textContent = data.owner || "Unavailable";
    document.getElementById("region").textContent = data.region;
    document.getElementById("branch-office").textContent = data.branchOffice;
    document.getElementById("source").textContent = data.source;

    if (data.owner === "Unavailable") {
        document.getElementById("inventory-details").style.display = "none";
        document.getElementById("update-inventory").style.display = "block";
    } else {
        document.getElementById("po-number").textContent = data.poNumber;
        document.getElementById("delivery-date").textContent = data.deliveryDate;
        document.getElementById("issue-date").textContent = data.issueDate;
        document.getElementById("inventory-details").style.display = "block";
        document.getElementById("update-inventory").style.display = "none";
    }

    // Fill in history
    const historyList = document.getElementById("history-list");
    data.history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });

    // Fill in logs
    const logList = document.getElementById("log-list");
    data.logs.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        logList.appendChild(li);
    });
});
