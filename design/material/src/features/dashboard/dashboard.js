import './dashboard.css';
import { setFun, getFun } from '../controlVars';
import { createDoughnutChart, createBarChart, createBarChartH, createBubbleChart  } from '../guicharts/CuriozityCharts';
import { doughnutChartData, macVendors, siteStatusData, bubbleChartData  } from '../../dummy/dummyData';

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
    
    
      const flexone = document.getElementById('flex-1');
      flexone.appendChild(createDoughnutChart(doughnutChartData));
      const flextwo = document.getElementById('flex-2');
      flextwo.appendChild(createBarChart(doughnutChartData));
      const flex3 = document.getElementById('flex-3');
      flex3.appendChild(createBarChartH(doughnutChartData));
      const flex4 = document.getElementById('flex-4');
      flex4.appendChild(createDoughnutChart(macVendors));
      const flex5 = document.getElementById('flex-5');
      flex5.appendChild(createDoughnutChart(siteStatusData));
      const flex6 = document.getElementById('flex-6');
      flex6.appendChild(createBubbleChart(bubbleChartData));

}
