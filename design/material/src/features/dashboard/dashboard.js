import './dashboard.css';
import { setFun, getFun } from '../controlVars';
import {addMap} from '../gis/mapModule';
import { 
    curiozdbRow,
    createCuriozdbSpecialRow,
    createCuriozdbCellContent,
    clearCellContent,
    curiozType3,
    createCuriozDashRow,
    addCharts
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
    bubbleChartData,
    macTotal,
    macToday,
    macNew
} from '../../dummy/dummyData';

export function loadDashboard() {
    setFun(false);
    const content = document.getElementById('content-id');
    
    // Clear any existing content
    content.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'curiozdb-container';
    const dashRow = createCuriozDashRow('dashRow1');
    const specialRowThree = curiozType3('magic');
    // Create the dashboard grid
    //container.appendChild(dashRow);
    container.appendChild(specialRowThree);
    // container.appendChild(curiozdbRow('row1'));
    // container.appendChild(curiozdbRow('row2'));
    
    // // Create and append the special row with a chart
    //container.appendChild(createCuriozdbSpecialRow('row3', 'chart1'));
    // container.appendChild(curiozdbRow('row4'));
    // container.appendChild(curiozdbRow('row5'));
 
    content.appendChild(container);
    let cellContent = createCuriozdbCellContent('MACs - Total Collection', 'fa-network-wired', macTotal.devices);
    console.log(cellContent);
    const upperLeft = document.getElementById('magic-upper-left');
    clearCellContent(upperLeft);
    upperLeft.appendChild(cellContent);

    const middleLeft = document.getElementById('magic-middle-left');
    clearCellContent(middleLeft);
    cellContent = createCuriozdbCellContent('MACs - New Today', 'fa-calendar-plus', macNew.devices);
    middleLeft.appendChild(cellContent);
    
    const lowerLeft = document.getElementById('magic-lower-left');
    clearCellContent(lowerLeft);
    cellContent = createCuriozdbCellContent('MACs - Visible Today', 'fa-binoculars', macToday.devices);
    lowerLeft.appendChild(cellContent);
    
    const upperRight = document.getElementById('magic-upper-right');
    clearCellContent(upperRight);
    cellContent = createCuriozdbCellContent('Sites - Active', 'fa-globe', '244');
    upperRight.appendChild(cellContent);
    upperRight.appendChild(cellContent);
    
    const middleRight = document.getElementById('magic-middle-right');
    clearCellContent(middleRight);
    cellContent = createCuriozdbCellContent('Sites - Zero Devices', 'fa-exclamation-circle', '26');
    middleRight.appendChild(cellContent);
    //middleRight.appendChild(cellContent);
    
    const lowerRight = document.getElementById('magic-lower-right');
    clearCellContent(lowerRight);
    cellContent = createCuriozdbCellContent('Sites - Not Reachable ', 'fa-times-circle', '104');
    lowerRight.appendChild(cellContent);
    //lowerRight.appendChild(cellContent);

    // Work on charts
    const magicChart = document.getElementById('magic-chart');
    clearCellContent(magicChart);
    const chart1 = createBarChart(macTotal.cities);
    const chart2 = createBarChart(macTotal.manufacture);
    // Use the addCharts function to combine them into a single container
    const combinedChartContainer = addCharts(chart1, chart2);
    magicChart.appendChild(combinedChartContainer);
    

    // Clear existing content in the cell
    // clearCellContent(cell1);

    // // Create the content div
    // const cellContent = createCuriozdbCellContent('Yasir', 'fa-chart-bar', '53');

    // // Append the new content to the cell
    // cell1.appendChild(cellContent);
    
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
