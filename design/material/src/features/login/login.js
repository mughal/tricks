import './login.css';
export function loadLogin() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    const loginContent = document.createElement('div');
    loginContent.className = 'login';
    loginContent.innerHTML = `
        <h2>Login</h2>
        <form>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <button type="submit">Login</button>
        </form>
    `;
    content.appendChild(loginContent);
}
