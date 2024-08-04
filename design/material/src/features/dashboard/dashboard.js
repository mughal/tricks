import './dashboard.css';
import { setFun, getFun } from '../controlVars';
export function loadDashboard() {
    setFun(false);
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    const dashboardContent = document.createElement('div');
    dashboardContent.className = 'dashboard';
    dashboardContent.innerHTML = '<h2>Dashboard</h2><p>Welcome to the dashboard!</p>';
    content.appendChild(dashboardContent);
}
