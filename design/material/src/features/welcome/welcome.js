import './welcome.css'
import welcomeImage from '../../images/welcome-place.jpeg';
import { loadLogin } from '../login/login';
export function loadWelcome() {
    const content = document.getElementById('content');
    content.innerHTML = `
    <section id="welcome-section">
    <img src="${welcomeImage}" alt="Welcome Image" class="welcome-image">
    <h1>Welcome to Curiosity</h1>
    <p>Place where ideas will take shape and have a life of their own with time.</p>
    <button class="login-button" id="login-button">Let's Go</button>
        </section>
    `;

    document.getElementById('login-button').addEventListener('click', loadLogin);
}