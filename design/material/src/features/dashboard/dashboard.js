import './dashboard.css';
import { 
    setFun,
    getFun,
    setSelectedCellId,
    getSelectedCellId
} from '../controlVars';
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
    macNew,
    sitesActive,
    sitesUnreachable,
    sitesZeroDevices
} from '../../dummy/dummyData';

let dashboardData = {}; // Variable to store fetched dashboard data

export async function loadDashboard() {
    setFun(false);
    const content = document.getElementById('content-id');
    
    // Clear any existing content
    content.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'curiozdb-container';
    //const dashRow = createCuriozDashRow('dashRow1');
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

    const response = await fetch('http://localhost:3000/api/dashboard'); // Replace with your API endpoint

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response JSON
    const { data, lastUpdated } = await response.json();
    console.log(data);
    dashboardData = data;
    initializeDashboard();
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

function initializeDashboard() {
    let cellContent = createCuriozdbCellContent(
        'MACs - Total Collection', 
        'fa-network-wired', 
        dashboardData.macs_total.devices,
        makeFooter(dashboardData.macs_total, "mac")
        );
    console.log(cellContent);
    const upperLeft = document.getElementById('magic-upper-left');
    clearCellContent(upperLeft);
    upperLeft.appendChild(cellContent);

    const middleLeft = document.getElementById('magic-middle-left');
    clearCellContent(middleLeft);
    cellContent = createCuriozdbCellContent(
        'MACs - New Today',
        'fa-calendar-plus',
        dashboardData.macs_new.devices,
        makeFooter(dashboardData.macs_new, "mac")
        );
    middleLeft.appendChild(cellContent);
    
    const lowerLeft = document.getElementById('magic-lower-left');
    clearCellContent(lowerLeft);
    cellContent = createCuriozdbCellContent(
        'MACs - Visible Today',
        'fa-binoculars',
        dashboardData.macs_today.devices,
        makeFooter(dashboardData.macs_today, "mac")
        );
    lowerLeft.appendChild(cellContent);
    
    const upperRight = document.getElementById('magic-upper-right');
    clearCellContent(upperRight);
    cellContent = createCuriozdbCellContent(
        'Sites - Active',
        'fa-globe',
        dashboardData.sites_active.sites.active,
        makeFooter(dashboardData.sites_active, "sites")
        );
    upperRight.appendChild(cellContent);
    upperRight.appendChild(cellContent);
    
    const middleRight = document.getElementById('magic-middle-right');
    clearCellContent(middleRight);
    cellContent = createCuriozdbCellContent(
        'Sites - Zero Devices',
        'fa-exclamation-circle',
        dashboardData.sites_arpzero.sites.active
        );
    middleRight.appendChild(cellContent);
    //middleRight.appendChild(cellContent);
    
    const lowerRight = document.getElementById('magic-lower-right');
    clearCellContent(lowerRight);
    cellContent = createCuriozdbCellContent(
        'Sites - Unreachable ',
        'fa-times-circle',
        dashboardData.sites_unreachable.sites.active,
        makeFooter(dashboardData.sites_unreachable, "unreachable")
        );
    lowerRight.appendChild(cellContent);
    //lowerRight.appendChild(cellContent);

    // Work on charts
    //renderChart(macTotal.cities, macTotal.manufacture);
    renderSingleChart(dashboardData.sites_active.sites.region);
    addCellListeners();
}

// Prepare data for footer
function makeFooter(footerData,mac_or_sites){
    console.log(footerData);
    switch (mac_or_sites) {
        case "mac": 
            return { 
                left: {
                    name: "EIS",
                    value: footerData.eis
                },
                right:{
                    name: "DHCP",
                    value: footerData.dhcp
                }
            };
        case "sites": 
            return { 
                left: {
                    name: "Total Planned",
                    value: footerData.sngplPlannedSites
                },
                right:{
                    name: "Future Designated",
                    value: footerData.sngplFutureSites
                }
            };
        case "unreachable":
            return { 
                left: {
                    name: "Never Reached",
                    value: footerData.sites_neverReached
                },
                right:{
                    name: "Previosuly Reached",
                    value: footerData.sites_previouslyReached
                }
            };
           
        case "zeroarp": break;
    }

}
// Function to render a chart dynamically based on data
function renderChart(chartData1, chartData2) {
    const magicChart = document.getElementById('magic-chart');
    clearCellContent(magicChart);

    const chart1 = createBarChart(chartData1);
    const chart2 = createBarChart(chartData2);

    const combinedChartContainer = addCharts(chart1, chart2);
    magicChart.appendChild(combinedChartContainer);

}

function renderSingleChart(chartData) {
    const magicChart = document.getElementById('magic-chart');
    clearCellContent(magicChart);

    const chart = createBarChart(chartData); // Create the single chart

    magicChart.appendChild(chart); // Directly append the single chart to the container
}
// Function to add event listeners to cells
// function addCellListeners() {
//     const upperLeft = document.getElementById('magic-upper-left');
//     console.log(`upperLeft element:`, upperLeft); // Check if element is found
//     upperLeft.addEventListener('click', () => {
//         console.log(`I am in upperleft ${upperLeft.id}`);
//         renderChart(macTotal.cities, macTotal.manufacture);
//     });

//     const middleLeft = document.getElementById('magic-middle-left');
//     console.log(`middleLeft element:`, middleLeft); // Check if element is found
//     middleLeft.addEventListener('click', () => {
//         console.log(`I am in middle left ${middleLeft.id}`);
//         setSelectedCellId(middleLeft.id);
//         renderChart(macNew.cities, macNew.manufacture);
//     });

//     const lowerLeft = document.getElementById('magic-lower-left');
//     lowerLeft.addEventListener('click', () => {
//         console.log(`I am in middle left ${lowerLeft.id}`);
//         renderChart(macToday.cities, macToday.manufacture);
//     });
    
//     const upperRight = document.getElementById('magic-upper-right');
//     upperRight.addEventListener('click', () => {
//         console.log(`I am in middle left ${upperRight.id}`);
//         console.log(sitesActive.sites);
//         console.log(sitesActive.cities);
//         renderSingleChart(sitesActive.cities);
//     });

//     const middleRight = document.getElementById('magic-lower-right');
//     middleRight.addEventListener('click', () => {
//         console.log(`I am in middle left ${middleRight.id}`);
//         console.log(sitesUnreachable.sites);
//         console.log(sitesUnreachable.cities);
//         renderSingleChart(sitesUnreachable.cities);
//     });

//     const lowerRight = document.getElementById('magic-middle-right');
//     lowerRight.addEventListener('click', () => {
//         console.log(`I am in middle left ${lowerRight.id}`);
//         console.log(sitesZeroDevices.sites);
//         console.log(sitesZeroDevices.cities);
//         renderSingleChart(sitesZeroDevices.cities);
//     });

// }

function addCellListeners() {
    const magicCells = document.querySelectorAll('.curiozdb-special-cell');
    const upperLeft = document.getElementById('magic-upper-left');
    console.log(`upperLeft element:`, upperLeft); // Check if element is found
    if (upperLeft) {
        upperLeft.addEventListener('click', () => {
            magicCells.forEach(c => c.classList.remove('curiozdb-cell-selected'));
            upperLeft.classList.add('curiozdb-cell-selected');
            console.log(`I am in upper left ${upperLeft.id}`);
            //renderChart(dashboardData.macs_total.region, dashboardData.macs_total.manufacturer);
            renderSingleChart(dashboardData.macs_total.region);
        });
    }

    const middleLeft = document.getElementById('magic-middle-left');
    console.log(`middleLeft element:`, middleLeft); // Check if element is found
    if (middleLeft) {
        middleLeft.addEventListener('click', () => {
            magicCells.forEach(c => c.classList.remove('curiozdb-cell-selected'));
            middleLeft.classList.add('curiozdb-cell-selected');
            console.log(`I am in middle left ${middleLeft.id}`);
            setSelectedCellId(middleLeft.id);
            //renderChart(dashboardData.macs_new.region, dashboardData.macs_new.manufacturer);
            renderSingleChart(dashboardData.macs_new.region);
        });
    }

    const lowerLeft = document.getElementById('magic-lower-left');
    console.log(`lowerLeft element:`, lowerLeft); // Check if element is found
    if (lowerLeft) {
        lowerLeft.addEventListener('click', () => {
            magicCells.forEach(c => c.classList.remove('curiozdb-cell-selected'));
            lowerLeft.classList.add('curiozdb-cell-selected');
            console.log(`I am in lower left ${lowerLeft.id}`);
            //renderChart(dashboardData.macs_today.region, dashboardData.macs_today.manufacturer);
            renderSingleChart(dashboardData.macs_today.region);
        });
    }

    const upperRight = document.getElementById('magic-upper-right');
    console.log(`upperRight element:`, upperRight); // Check if element is found
    if (upperRight) {
        upperRight.addEventListener('click', () => {
            magicCells.forEach(c => c.classList.remove('curiozdb-cell-selected'));
            upperRight.classList.add('curiozdb-cell-selected');
            console.log(`I am in upper right ${upperRight.id}`);
            // console.log(sitesActive.sites);
            // console.log(sitesActive.cities);
            renderSingleChart(dashboardData.sites_active.sites.region);
        });
    }

    const middleRight = document.getElementById('magic-lower-right');
    console.log(`middleRight element:`, middleRight); // Check if element is found
    if (middleRight) {
        middleRight.addEventListener('click', () => {
            magicCells.forEach(c => c.classList.remove('curiozdb-cell-selected'));
            middleRight.classList.add('curiozdb-cell-selected');
            console.log(`I am in middle right ${middleRight.id}`);
            console.log(sitesUnreachable.sites);
            console.log(sitesUnreachable.cities);
            renderSingleChart(dashboardData.sites_unreachable.sites.region);
        });
    }

    const lowerRight = document.getElementById('magic-middle-right');
    console.log(`lowerRight element:`, lowerRight); // Check if element is found
    if (lowerRight) {
        lowerRight.addEventListener('click', () => {
            magicCells.forEach(c => c.classList.remove('curiozdb-cell-selected'));
            lowerRight.classList.add('curiozdb-cell-selected');
            console.log(`I am in lower right ${lowerRight.id}`);
            // console.log(sitesZeroDevices.sites);
            // console.log(sitesZeroDevices.cities);
            renderSingleChart(dashboardData.sites_arpzero.sites.region);
        });
    }
}

// Initialize the dashboard
// function initializeDashboard() {
//     // Upper left cell: MACs - Total Collection
//     let cellContent = createCuriozdbCellContent('MACs - Total Collection', 'fa-network-wired', macTotal.devices);
//     const upperLeft = document.getElementById('magic-upper-left');
//     clearCellContent(upperLeft);
//     upperLeft.appendChild(cellContent);

//     // Middle left cell: MACs - New Today
//     cellContent = createCuriozdbCellContent('MACs - New Today', 'fa-calendar-plus', macNew.devices);
//     const middleLeft = document.getElementById('magic-middle-left');
//     clearCellContent(middleLeft);
//     middleLeft.appendChild(cellContent);

//     // Lower left cell: MACs - Visible Today
//     cellContent = createCuriozdbCellContent('MACs - Visible Today', 'fa-binoculars', macToday.devices);
//     const lowerLeft = document.getElementById('magic-lower-left');
//     clearCellContent(lowerLeft);
//     lowerLeft.appendChild(cellContent);

//     // Initially render the chart for macTotal
    

//     // Add listeners for dynamic chart updates
//     
// }

// // Call the initialize function
