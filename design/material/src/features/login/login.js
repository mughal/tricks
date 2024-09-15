import './login.css';
import { setFun, setLoggedIn, updateUI } from '../controlVars';
export function loadLogin() {
    const content = document.getElementById('content-id');
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

    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log('Login with:', username, password);
    
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.text();
            setLoggedIn(true);
            content.innerHTML = ''; // Update the content as needed
        
        //     if (data === 'Login successful') {
        //         setLoggedIn(true);
        //         content.innerHTML = ''; // Update the content as needed
        //     } else {
        //         alert('Login failed');
        //     }
         } catch (error) {
            console.error('Error:', error);
        }
    });
    
}
