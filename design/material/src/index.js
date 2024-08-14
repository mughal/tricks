import './styles.css';
// Assuming your JS file is located at src/index.js and your image is at src/images/welcome.png


//import './fonts/Roboto/roboto-regular.woff2';
import { loadDashboard } from './features/dashboard/dashboard';
import { loadLogin } from './features/login/login';
import { loadWelcome} from './features/welcome/welcome';
import { setFun, getFun, setLoggedIn, updateUI, isLoggedIn } from './features/controlVars';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const content = document.getElementById('content-id');
    document.getElementById('dashboard-link').addEventListener('click', loadDashboard);
    document.getElementById('login-link').addEventListener('click', loadLogin);
    loadWelcome();
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ip = document.getElementById('ip-input').value.trim();
        if (!getFun()) {
            content.innerHTML='';
            setFun(true);
        }

        if (!ip) return alert('Please enter a valid IP address.');
        console.log(ip)

        try {
            const response = await fetch(`http://localhost:3000/api/network?ip=${ip}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            addCard(data);
        } catch (error) {
            alert('Error fetching data: ' + error.message);
        }
    });

    function addCard(data) {
        const card = document.createElement('div');
        card.className = 'card';
        console.log(data)
        if (!getFun()) {
            content.innerHTML='';
        }

        card.innerHTML = `
            <div class="header">
                <span class="material-icons icon">language</span>
                <h2>IP Address: ${data.ip || 'N/A'}</h2>
            </div>
            <div class="body">
                <p><span class="material-icons icon">lan</span> ${data.macAddress || 'N/A'}</p>
                <p><span class="material-icons icon">precision_manufacturing</span> ${data.manufacturer || 'N/A'}</p>
                <p><span class="material-icons icon">person</span> ${data.userDetails || 'N/A'}</p>
                <p><span class="material-icons icon">update</span> ${data.lastSeen || 'N/A'}</p>
                <p><span class="material-icons icon">location_city</span> ${data.mainOffice || 'N/A'}</p>
                <p><span class="material-icons icon">corporate_fare</span> ${data.subOffice || 'N/A'}</p>
                <p><span class="material-icons icon">sync_alt</span> ${data.source || 'N/A'}</p>
            </div>
        `;
        content.appendChild(card);
    }

    
    
    document.getElementById('logout-link').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        setLoggedIn(false);
        content.innerHTML='';
    });
});
