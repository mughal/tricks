import './dashboard.css';
import { setFun, getFun } from '../controlVars';
import {addMap} from '../gis/mapModule';
import { 
    curiozdbRow,
    createCuriozdbSpecialRow,
    createCuriozdbCellContent,
    clearCellContent
} from '../curiozdb/curiozdb.js';

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
    const container = document.createElement('div');
    container.className = 'curiozdb-container';
    // Create the dashboard grid
    container.appendChild(curiozdbRow('row1'));
    container.appendChild(curiozdbRow('row2'));
    
    // // Create and append the special row with a chart
    container.appendChild(createCuriozdbSpecialRow('row3', 'chart1'));
    container.appendChild(curiozdbRow('row4'));
    container.appendChild(curiozdbRow('row5'));
    content.appendChild(container);
    const cell1 = document.getElementById('row1-cell1-small');

    // Clear existing content in the cell
    clearCellContent(cell1);

    // Create the content div
    const cellContent = createCuriozdbCellContent('Yasir', 'fa-chart-bar', '53');

    // Append the new content to the cell
    cell1.appendChild(cellContent);
    
    // // Continue appending other rows as needed
    // content.appendChild(curiozdbRow('row4'));

    
    
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
