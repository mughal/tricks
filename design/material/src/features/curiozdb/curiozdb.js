import './curiozdb.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

// Function to create a normal row
export function curiozdbRow(rowId) {
    const row = document.createElement('div');
    row.className = 'curiozdb-row';
    if (rowId) {
        row.id = rowId;
    }

    // Create cell1 with title, icon, and quantity
    const cell1 = document.createElement('div');
    cell1.className = 'curiozdb-cell cell-small';
    cell1.id = `${rowId}-cell1-small`;

    const cell1Title = document.createElement('div');
    cell1Title.className = 'cell-title';
    cell1Title.textContent = 'Data';

    const cell1Content = document.createElement('div');
    cell1Content.className = 'cell-content';

    const cell1Icon = document.createElement('i');
    cell1Icon.className = 'fas fa-chart-bar cell-icon'; // Use Font Awesome icon

    const cell1Quantity = document.createElement('div');
    cell1Quantity.className = 'cell-quantity';
    cell1Quantity.textContent = '9999';

    cell1Content.appendChild(cell1Icon);
    cell1Content.appendChild(cell1Quantity);

    cell1.appendChild(cell1Title);
    cell1.appendChild(cell1Content);

    // Create cell2 (for the large cell)
    const cell2 = document.createElement('div');
    cell2.className = 'curiozdb-cell cell-large';
    cell2.id = `${rowId}-cell2-large`;

    // Create cell3 with title, icon, and quantity
    const cell3 = document.createElement('div');
    cell3.className = 'curiozdb-cell cell-small';
    cell3.id = `${rowId}-cell3-small`;

    const cell3Title = document.createElement('div');
    cell3Title.className = 'cell-title';
    cell3Title.textContent = 'Other Data';

    const cell3Content = document.createElement('div');
    cell3Content.className = 'cell-content';

    const cell3Icon = document.createElement('i');
    cell3Icon.className = 'fas fa-chart-line cell-icon'; // Use Font Awesome icon

    const cell3Quantity = document.createElement('div');
    cell3Quantity.className = 'cell-quantity';
    cell3Quantity.textContent = '8888';

    cell3Content.appendChild(cell3Icon);
    cell3Content.appendChild(cell3Quantity);

    cell3.appendChild(cell3Title);
    cell3.appendChild(cell3Content);

    // Append cells to row
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    return row;
}

// Function to create a special row with a chart
export function createCuriozdbSpecialRow(rowId, chartId) {
    const row = document.createElement('div');
    row.className = 'curiozdb-special-row';
    if (rowId) {
        row.id = rowId;
    }

    // Create the upper left cell
    const upperLeftCell = document.createElement('div');
    upperLeftCell.className = 'curiozdb-special-cell upper-left';
    upperLeftCell.id = `${rowId}-upper-left`;

    // Create the lower left cell
    const lowerLeftCell = document.createElement('div');
    lowerLeftCell.className = 'curiozdb-special-cell lower-left';
    lowerLeftCell.id = `${rowId}-lower-left`;

    // Create the chart container for the middle large cell
    const chartContainer = document.createElement('div');
    chartContainer.className = 'curiozdb-chart';
    chartContainer.id = chartId;

    // Create the upper right cell
    const upperRightCell = document.createElement('div');
    upperRightCell.className = 'curiozdb-special-cell upper-right';
    upperRightCell.id = `${rowId}-upper-right`;

    // Create the lower right cell
    const lowerRightCell = document.createElement('div');
    lowerRightCell.className = 'curiozdb-special-cell lower-right';
    lowerRightCell.id = `${rowId}-lower-right`;

    // Append the cells to the row
    row.appendChild(upperLeftCell);
    row.appendChild(lowerLeftCell);
    row.appendChild(chartContainer);
    row.appendChild(upperRightCell);
    row.appendChild(lowerRightCell);

    return row;
}
// Example of usage
// const content = document.getElementById('content');

// // Create and append normal rows
// content.appendChild(curiozdbRow('row1'));
// content.appendChild(curiozdbRow('row2'));

// // Create and append the special row with a chart
// content.appendChild(createCuriozdbSpecialRow('row3', 'chart1'));

// // Continue appending other rows as needed
// content.appendChild(curiozdbRow('row4'));

/**
 * Creates cell content for Curiozdb with optional footer data.
 * @param {string} title - The title of the cell.
 * @param {string} iconClass - The CSS class for the icon.
 * @param {number} number - The numerical value or identifier.
 * @param {Object|null} footer - Optional JSON object for footer content or null if not needed.
 * @returns {Element} The newly created cell element.
 */

export function createCuriozdbCellContent(title, iconClass, number, footer = null) {
    // Create the main container div
    const container = document.createElement('div');
    container.className = 'curiozdb-cell-content'; // Apply a class for styling

    // Create the title div
    const titleDiv = document.createElement('div');
    titleDiv.className = 'curiozdb-cell-title';
    titleDiv.textContent = title;

    // Create the content div that will hold the icon and number
    const contentDiv = document.createElement('div');
    contentDiv.className = 'curiozdb-cell-data';

    // Create the icon element using Font Awesome
    const iconElement = document.createElement('i');
    iconElement.className = `fas ${iconClass} curiozdb-cell-icon`; // Use Font Awesome class

    // Create the number element
    const numberElement = document.createElement('div');
    numberElement.className = 'curiozdb-cell-number';
    numberElement.textContent = number;

    // Append the icon and number to the content div
    contentDiv.appendChild(iconElement);
    contentDiv.appendChild(numberElement);

    // Append the title and content divs to the main container
    container.appendChild(titleDiv);
    container.appendChild(contentDiv);

     // Static JSON data for the footer
     const footerData = {
        left: {
            name: "Yasir",
            value: 350
        },
        
        right: {
            name: "DHCP",
            value: 43
        }
    };

     // Generate the footer using the createFooter function
     footer = createFooter(footerData);
     container.append(footer);

    return container;
}

export function clearCellContent(cell) {
    if (!cell) {
        console.error('Cell not found');
        return;
    }
    while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
    }
}

export function curiozType3(rowId) {
    const row = document.createElement('div');
    row.className = 'curiozdb-special-row-three';
    if (rowId) {
        row.id = rowId;
    }

    // Create the upper left cell
    const upperLeftCell = document.createElement('div');
    upperLeftCell.className = 'curiozdb-special-cell upper-left';
    upperLeftCell.id = `${rowId}-upper-left`;

    // Create the middle left cell
    const middleLeftCell = document.createElement('div');
    middleLeftCell.className = 'curiozdb-special-cell middle-left';
    middleLeftCell.id = `${rowId}-middle-left`;

    // Create the lower left cell
    const lowerLeftCell = document.createElement('div');
    lowerLeftCell.className = 'curiozdb-special-cell lower-left';
    lowerLeftCell.id = `${rowId}-lower-left`;

    // Create the chart container for the middle large cell
    const chartContainer = document.createElement('div');
    chartContainer.className = 'curiozdb-chart-three';
    chartContainer.id = `${rowId}-chart`;
    chartContainer.textContent = 'Bar Chart Area';

    // Create the upper right cell
    const upperRightCell = document.createElement('div');
    upperRightCell.className = 'curiozdb-special-cell upper-right';
    upperRightCell.id = `${rowId}-upper-right`;

    // Create the middle right cell
    const middleRightCell = document.createElement('div');
    middleRightCell.className = 'curiozdb-special-cell middle-right';
    middleRightCell.id = `${rowId}-middle-right`;

    // Create the lower right cell
    const lowerRightCell = document.createElement('div');
    lowerRightCell.className = 'curiozdb-special-cell lower-right';
    lowerRightCell.id = `${rowId}-lower-right`;

    // Append all cells to the row
    row.appendChild(upperLeftCell);
    row.appendChild(middleLeftCell);
    row.appendChild(lowerLeftCell);
    row.appendChild(chartContainer);
    row.appendChild(upperRightCell);
    row.appendChild(middleRightCell);
    row.appendChild(lowerRightCell);

    return row;
}

export function createCuriozDashRow(rowId) {
    const row = document.createElement('div');
    row.className = 'curioz-dash-row';
    if (rowId) {
        row.id = rowId;
    }

    // First column (left)
    const upperLeftCell = document.createElement('div');
    upperLeftCell.className = 'curioz-dash-cell upper-left';
    upperLeftCell.id = `${rowId}-upper-left`;

    const middleLeftCell = document.createElement('div');
    middleLeftCell.className = 'curioz-dash-cell middle-left';
    middleLeftCell.id = `${rowId}-middle-left`;

    const lowerLeftCell = document.createElement('div');
    lowerLeftCell.className = 'curioz-dash-cell lower-left';
    lowerLeftCell.id = `${rowId}-lower-left`;

    // Merged middle column with inner grid
    const middleCell = document.createElement('div');
    middleCell.className = 'curioz-dash-cell';
    middleCell.style.gridColumn = '2 / 5'; /* Span columns 2, 3, 4 */

    const innerGrid = document.createElement('div');
    innerGrid.className = 'curioz-dash-inner';

    const upperMiddleCell = document.createElement('div');
    upperMiddleCell.className = 'curioz-dash-inner upper-middle';
    upperMiddleCell.id = `${rowId}-upper-middle`;

    const lowerMiddleCell = document.createElement('div');
    lowerMiddleCell.className = 'curioz-dash-inner lower-middle';
    lowerMiddleCell.id = `${rowId}-lower-middle`;

    innerGrid.appendChild(upperMiddleCell);
    innerGrid.appendChild(lowerMiddleCell);
    middleCell.appendChild(innerGrid);

    // Last column (right)
    const upperRightCell = document.createElement('div');
    upperRightCell.className = 'curioz-dash-cell upper-right';
    upperRightCell.id = `${rowId}-upper-right`;

    const middleRightCell = document.createElement('div');
    middleRightCell.className = 'curioz-dash-cell middle-right';
    middleRightCell.id = `${rowId}-middle-right`;

    const lowerRightCell = document.createElement('div');
    lowerRightCell.className = 'curioz-dash-cell lower-right';
    lowerRightCell.id = `${rowId}-lower-right`;

    // Append all cells to the row
    row.appendChild(upperLeftCell);
    row.appendChild(middleLeftCell);
    row.appendChild(lowerLeftCell);
    row.appendChild(middleCell);
    row.appendChild(upperRightCell);
    row.appendChild(middleRightCell);
    row.appendChild(lowerRightCell);

    return row;
}

export function addCharts(chart1, chart2) {
    // Create a container div for the two charts
    const container = document.createElement('div');
    container.className = 'curioz-hcharts2';

    // Create two divs to hold each chart
    const upperChartDiv = document.createElement('div');
    upperChartDiv.className = 'upper-chart';
    upperChartDiv.style.gridRow = '1 / 2'; // Place in the first row
    upperChartDiv.appendChild(chart1); // Append the first chart

    const lowerChartDiv = document.createElement('div');
    lowerChartDiv.className = 'lower-chart';
    lowerChartDiv.style.gridRow = '2 / 3'; // Place in the second row
    lowerChartDiv.appendChild(chart2); // Append the second chart

    // Append the two chart divs to the container
    container.appendChild(upperChartDiv);
    container.appendChild(lowerChartDiv);

    // Return the container with the two charts
    return container;
}

/**
 * Creates a footer element with content based on provided JSON data.
 * @param {Object} footerData - JSON object containing data for the footer.
 * @returns {Element} The footer DOM element.
 */
 function createFooter(footerData) {
    // Create the footer element
    const footer = document.createElement('div');
    footer.className = 'curiozdb-cell-footer';

    // Check if footerData contains the required keys
    if (footerData && typeof footerData === 'object') {
        // Create left element in the footer
        const leftSpan = document.createElement('span');
        leftSpan.className = 'left';
        if (footerData.left !== undefined) {
            leftSpan.textContent = `${footerData.left.name} (${footerData.left.value})`;
        }

        // Create right element in the footer
        const rightSpan = document.createElement('span');
        rightSpan.className = 'right';
        if (footerData.right !== undefined) {
            rightSpan.textContent = `${footerData.right.name} (${footerData.right.value})`;
        }

        // Append spans to footer
        footer.appendChild(leftSpan);
        footer.appendChild(rightSpan);
    } else {
        // If data is not provided or invalid, maybe add a default message
        footer.textContent = 'No data available';
    }

    return footer;
}
