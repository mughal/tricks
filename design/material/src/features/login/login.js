import './login.css';
import { setFun, setLoggedIn, updateUI } from '../controlVars';
export function loadLogin() {
    const content = document.getElementById('content');
    setFun(false);
    content.innerHTML = `
        <section id="login-section">
            <h1>Curiozity</h1>
            <h2>Log in</h2>
            <form id="login-form">
           
            <div class="input-container">
                <input type="text" id="username" name="username" placeholder=" " required>
                <label for="username">Username</label>
            </div>
            <div class="input-container">
                <input type="password" id="password" name="password" placeholder=" " required>
                <label for="password">Password</label>
            </div>
            <button class="login-button" type="submit">Login</button>
            </form>
        </section>
    `;

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log('Login with:', username, password);
        setLoggedIn(true);
        content.innerHTML='';
        // Here, add your authentication logic
    });
}
