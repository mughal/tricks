import './curiozdb.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

export function curiozdbRow() {
    // Create row container
    const row = document.createElement('div');
    row.className = 'curiozdb-row';

    // Create cell1 with title, icon, and quantity
    const cell1 = document.createElement('div');
    cell1.className = 'curiozdb-cell cell-small';

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

    // Create cell2 (we will add the graph later)
    const cell2 = document.createElement('div');
    cell2.className = 'curiozdb-cell cell-large';

    // Create cell3 with title, icon, and quantity
    const cell3 = document.createElement('div');
    cell3.className = 'curiozdb-cell cell-small';

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
