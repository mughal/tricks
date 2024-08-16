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

    const cell1 = document.createElement('div');
    cell1.className = 'curiozdb-special-cell cell-small';
    cell1.id = `${rowId}-cell1-small`;

    const chartContainer = document.createElement('div');
    chartContainer.className = 'curiozdb-chart curiozdb-special-cell'; // Ensure it uses the special cell class
    chartContainer.id = chartId;
    chartContainer.textContent = 'Bar Chart Area';

    const cell3 = document.createElement('div');
    cell3.className = 'curiozdb-special-cell cell-small';
    cell3.id = `${rowId}-cell3-small`;

    row.appendChild(cell1);
    row.appendChild(chartContainer);
    row.appendChild(cell3);

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
