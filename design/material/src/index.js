import './styles.css';
// Assuming your JS file is located at src/index.js and your image is at src/images/welcome.png
import welcomeImage from './images/welcome.png';

//import './fonts/Roboto/roboto-regular.woff2';
import { loadDashboard } from './features/dashboard/dashboard';
import { loadLogin } from './features/login/login';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const content = document.getElementById('content');
    document.getElementById('dashboard-link').addEventListener('click', loadDashboard);
    document.getElementById('login-link').addEventListener('click', loadLogin);
    loadWelcome();
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ip = document.getElementById('ip-input').value.trim();

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

    function loadWelcome() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <section id="welcome-section">
                <img src="${welcomeImage}" alt="Welcome to Network Info Finder">
                <p>We're your trusted network information source, providing detailed data insights and support.</p>
                <button id="go-to-login">Log In</button>
            </section>
        `;
    
        document.getElementById('go-to-login').addEventListener('click', loadLogin);
    }
    
    function loadLogin() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <section id="login-section">
                <form id="login-form">
                    <label for="email">Email address*</label>
                    <input type="email" id="email" required>
                    <label for="password">Password*</label>
                    <input type="password" id="password" required>
                    <button type="submit">Log In</button>
                    <a href="#">Forgot password?</a>
                </form>
            </section>
        `;
    
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log('Login with:', email, password);
            // Here, add your authentication logic
        });
    }
    
});
