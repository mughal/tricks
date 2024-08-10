import './dashboard.css';
import { setFun, getFun } from '../controlVars';
import { createDoughnutChart, createBarChart } from '../guicharts/CuriozityCharts';


export function loadDashboard() {
    setFun(false);
    const content = document.getElementById('content-id');
    
    // Clear any existing content
    content.innerHTML = '';

    // Create the dashboard grid
    const dashboardGrid = document.createElement('div');
    dashboardGrid.className = 'dashboard-grid';
    
    // Adding 16 grid items, each with a flex container inside
    for (let i = 1; i <= 16; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        
        // Create a flex container inside the grid item
        const flexContainer = document.createElement('div');
        flexContainer.className = 'flex-container';
        flexContainer.id = `flex-${i}`; // Assign a unique ID
        
        // Optionally, you can add some content inside the flex container
        //flexContainer.textContent = `Item ${i}`;
        
        // Append the flex container to the grid item
        gridItem.appendChild(flexContainer);
        dashboardGrid.appendChild(gridItem);
    }
    
    // Append the grid to the content area
    content.appendChild(dashboardGrid);
    const doughnutChartData = {
        "Area 1": 2197,
        "Area 2": 181,
        "Area 3": 438,
        "Area 4": 145,
        "Area 5": 13,
      };
    
      const flexone = document.getElementById('flex-1');
      flexone.appendChild(createDoughnutChart(doughnutChartData));
      const flextwo = document.getElementById('flex-2');
      flextwo.appendChild(createBarChart(doughnutChartData));

}
