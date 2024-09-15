import './mac2ip.css'
  // Example usage:
  // document.body.appendChild(getCard(data));
import { macSamples } from '../../dummy/dummyData.js';
function getMacToIp(data) {
  // Create main container for MAC to IP details card
  const container = document.createElement('div');
  container.classList.add('ip-details-card');

  // Create Header Section
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');

  const iconHeader = document.createElement('div');
  iconHeader.classList.add('icon');
  iconHeader.innerHTML = '<i class="fas fa-barcode"></i>';

  const macAddress = document.createElement('div');
  macAddress.classList.add('search-mac-ip');
  macAddress.id = 'ym-mac';
  macAddress.textContent = data.macAddress;

  // Append Header Elements
  cardHeader.appendChild(iconHeader);
  cardHeader.appendChild(macAddress);
  container.appendChild(cardHeader);

  // Create Content Section for each IP
  const ymGrid = document.createElement('div');
  ymGrid.classList.add('ym-grid');

  data.ipDetails.forEach(ipDetail => {
    // Create Column 1 for Source Details
    const column1 = document.createElement('div');
    column1.classList.add('ym-column-1');

    const cardContent1 = document.createElement('div');
    cardContent1.classList.add('card-content');

    const cIconContent1 = document.createElement('div');
    cIconContent1.classList.add('c-icon-content');

    const iconCity = document.createElement('div');
    iconCity.classList.add('icon');
    iconCity.innerHTML = '<i class="fas fa-city"></i>';

    const cSource = document.createElement('div');
    cSource.classList.add('c-source');

    const sourceIp = document.createElement('div');
    sourceIp.classList.add('sngpl-source', 'clight0');
    sourceIp.id = 'ym-source';
    sourceIp.textContent = ipDetail.source.ip;

    const sourceLocation = document.createElement('div');
    sourceLocation.classList.add('sngpl-location', 'clight1');
    sourceLocation.id = 'ym-location';
    sourceLocation.textContent = ipDetail.source.location;

    const sourceRegion = document.createElement('div');
    sourceRegion.classList.add('sngpl-region', 'clight0');
    sourceRegion.id = 'ym-region';
    sourceRegion.textContent = ipDetail.source.region;

    // Append Source Details to Column 1
    cSource.appendChild(sourceIp);
    cSource.appendChild(sourceLocation);
    cSource.appendChild(sourceRegion);
    cIconContent1.appendChild(iconCity);
    cIconContent1.appendChild(cSource);
    cardContent1.appendChild(cIconContent1);
    column1.appendChild(cardContent1);

    // Create Column 2 for IP and User Details
    const column2 = document.createElement('div');
    column2.classList.add('ym-column-2');

    const cardContent2 = document.createElement('div');
    cardContent2.classList.add('card-content');

    const cIconMac = document.createElement('div');
    cIconMac.classList.add('c-icon-mac');

    const iconNetwork = document.createElement('div');
    iconNetwork.classList.add('icon');
    iconNetwork.innerHTML = '<i class="fas fa-network-wired"></i>';

    const cMac = document.createElement('div');
    cMac.classList.add('c-mac');
    cMac.id = 'ym-ip';
    cMac.textContent = ipDetail.ipAddress;

    // Append IP Details to Column 2
    cIconMac.appendChild(iconNetwork);
    cIconMac.appendChild(cMac);
    cardContent2.appendChild(cIconMac);

    // Append Device History
    const devHistory = document.createElement('div');
    devHistory.classList.add('dev-history');
    devHistory.id = 'ym-history';

    // Headings
    const devHistoryHead1 = document.createElement('div');
    devHistoryHead1.classList.add('dev-history-head');
    devHistoryHead1.textContent = 'First Seen';

    const devHistoryHead2 = document.createElement('div');
    devHistoryHead2.classList.add('dev-history-head');
    devHistoryHead2.textContent = 'Last Seen';

    devHistory.appendChild(devHistoryHead1);
    devHistory.appendChild(devHistoryHead2);

    // Dates
    const firstSeen = document.createElement('div');
    firstSeen.classList.add('dev-history-dates');
    firstSeen.textContent = ipDetail.firstSeen;

    const lastSeen = document.createElement('div');
    lastSeen.classList.add('dev-history-dates');
    lastSeen.textContent = ipDetail.lastSeen;

    devHistory.appendChild(firstSeen);
    devHistory.appendChild(lastSeen);

    cardContent2.appendChild(devHistory);

    // User Details
    const eisDhcp = document.createElement('div');
    eisDhcp.classList.add('eis-dhcp');

    const userDetails = document.createElement('div');
    userDetails.classList.add('c-icon-content');

    const userIcon = document.createElement('div');
    userIcon.classList.add('icon');
    userIcon.innerHTML = '<i class="fas fa-user"></i>';

    const cUser = document.createElement('div');
    cUser.classList.add('c-user');
    cUser.id = 'ym-eis-emp-name';

    const userName = document.createElement('div');
    userName.classList.add('sngpl-name', 'clight0');
    userName.textContent = ipDetail.user.name;

    const empNo = document.createElement('div');
    empNo.classList.add('sngpl-emp', 'clight1');
    empNo.id = 'ym-eis-emp-no';
    empNo.textContent = ipDetail.user.employeeNumber;

    const dept = document.createElement('div');
    dept.classList.add('sngpl-dept', 'clight0');
    dept.id = 'ym-eis-dept';
    dept.textContent = ipDetail.user.department;

    // Append User Details
    cUser.appendChild(userName);
    cUser.appendChild(empNo);
    cUser.appendChild(dept);
    userDetails.appendChild(userIcon);
    userDetails.appendChild(cUser);
    eisDhcp.appendChild(userDetails);

    // PC Details
    const pcDetails = document.createElement('div');
    pcDetails.classList.add('c-icon-content');

    const pcIcon = document.createElement('div');
    pcIcon.classList.add('icon');
    pcIcon.innerHTML = '<i class="fas fa-desktop"></i>';

    const cPc = document.createElement('div');
    cPc.classList.add('c-pc');

    const pcName = document.createElement('div');
    pcName.classList.add('pc-name', 'clight0');
    pcName.id = 'ym-adname';
    pcName.textContent = ipDetail.pc.pcName;

    const pcOs = document.createElement('div');
    pcOs.classList.add('pc-os', 'clight1');
    pcOs.textContent = ipDetail.pc.operatingSystem;

    const dhcpName = document.createElement('div');
    dhcpName.classList.add('sngpl-dhcp', 'clight0');
    dhcpName.id = 'ym-dhcp-name';
    dhcpName.textContent = ipDetail.pc.dhcpName;

    // Append PC Details
    cPc.appendChild(pcName);
    cPc.appendChild(pcOs);
    cPc.appendChild(dhcpName);
    pcDetails.appendChild(pcIcon);
    pcDetails.appendChild(cPc);
    eisDhcp.appendChild(pcDetails);

    // Append everything to the second column
    cardContent2.appendChild(eisDhcp);
    column2.appendChild(cardContent2);

    // Append both columns to the grid
    ymGrid.appendChild(column1);
    ymGrid.appendChild(column2);
  });

  // Append grid to main container
  container.appendChild(ymGrid);

  // Return the dynamically created container
  return container;
}

export function loadmac2IP(){
  const content = document.getElementById('content-id');  
    // Clear existing content
  content.innerHTML = '';
  const maccard = getMacToIp(macSamples[2]);
  content.appendChild(maccard);
}