import './dashboard.css';
import { setFun, getFun } from '../controlVars';

export function loadDashboard() {
    
    setFun(false);
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    const dashboardContent = document.createElement('div');
    dashboardContent.className = 'dashboard-grid';

    // Create a 4x4 grid
    for (let i = 1; i <= 9; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        
        // Create a flex div inside each grid cell with an ID
        const flexDiv = document.createElement('div');
        flexDiv.className = 'flex-container';
        flexDiv.id = `flex-div-${i}`; // Assign an ID based on the cell number
        flexDiv.innerText = i; // Display the cell number
        
        gridItem.appendChild(flexDiv);
        dashboardContent.appendChild(gridItem);
    }

    content.appendChild(dashboardContent);
}
