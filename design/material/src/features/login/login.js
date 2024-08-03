import './login.css';
export function loadLogin() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    const loginContent = document.createElement('div');
    loginContent.className = 'login';
    loginContent.innerHTML = `
        <h2>Curiozity</h2>
        <h3>Login</h3>
        <form>
        <div class="input-container">
            <input type="text" id="username" name="username" placeholder=" " required>
            <label for="username">Email Address</label>
        </div>
        <div class="input-container">
            <input type="password" id="password" name="password" placeholder=" " required>
            <label for="password">Password</label>
        </div>
        <button type="submit">Login</button>
    </form>
    `;
    content.appendChild(loginContent);
}
