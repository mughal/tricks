import './dashboard.css';
import { setFun, getFun } from '../controlVars';
import {addMap} from '../gis/mapModule';
import { curiozdbRow, combineCellsForChart } from '../curiozdb/curiozdb.js';
import { 
    createDualAxisBarChart,
    createDoughnutChart,
    createBarChart,
    createBarChartH,
    createBubbleChart,
    createStackedBarChart
} from '../guicharts/CuriozityCharts';

import {
    devices_in_cities,
    dualData,
    stackdata,
    doughnutChartData,
    macVendors,
    siteStatusData,
    bubbleChartData
} from '../../dummy/dummyData';

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
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'curiozdb-container';

    // Append rows to the grid container
    gridContainer.appendChild(curiozdbRow('row1'));
    gridContainer.appendChild(curiozdbRow('row2'));
    gridContainer.appendChild(curiozdbRow('row3'));
    gridContainer.appendChild(curiozdbRow('row4'));

    // Append the grid container to the content area
    content.appendChild(gridContainer);
    //combineCellsForChart('chart1', 'row1-cell2-large', 'row2-cell2-large');

    //createCuriozdbChart('chart1', 'row1', 'row2');

    //createCuriozdbChart('chart1', 'row1', 'row2');
    //content.appendChild(curiozdbRow());
    // content.appendChild(dashboardGrid);
    
    
    //   const flexone = document.getElementById('flex-1');
    //   flexone.appendChild(createDoughnutChart(doughnutChartData));
    //   const flextwo = document.getElementById('flex-2');
    //   flextwo.appendChild(createBarChart(doughnutChartData));
    //   const flex3 = document.getElementById('flex-3');
    //   flex3.appendChild(createBarChartH(doughnutChartData));
    //   const flex4 = document.getElementById('flex-4');
    //   flex4.appendChild(createDoughnutChart(macVendors));
    //   const flex5 = document.getElementById('flex-5');
    //   flex5.appendChild(createDoughnutChart(siteStatusData));
    //   const flex6 = document.getElementById('flex-6');
    //   flex6.appendChild(createBubbleChart(bubbleChartData));
    //   const flex7 = document.getElementById('flex-7');
    //   flex7.appendChild(createStackedBarChart(stackdata));
    //   const flex8 = document.getElementById('flex-8');
    //   flex8.appendChild(createDualAxisBarChart(dualData));
    //   const flex9 = document.getElementById('flex-9');
    //   flex9.appendChild(addMap(devices_in_cities));

}
