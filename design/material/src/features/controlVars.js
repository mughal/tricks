// state.js
let state = {
    fun: false,
    loggedIn: false,
    selectedCellId: null // Track the ID of the currently selected cell
};

export const setFun = (value) => {
    state.fun = value;
};

export const getFun = () => {
    return state.fun;
};

export const setLoggedIn = (value) => {
    state.loggedIn = value;
    console.log(`I came here to set value ${value}`);
    updateUI();
};

export const isLoggedIn = () => {
    return state.loggedIn;
};

// Function to update the UI based on login status
export const updateUI = () => {
    const searchForm = document.getElementById('search-form');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (state.loggedIn) {
        searchForm.style.display = 'block';
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        searchForm.style.display = 'none';
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }
};

// Functions to manage the selected cell ID
export const setSelectedCellId = (cellId) => {
    state.selectedCellId = cellId;
};

export const getSelectedCellId = () => {
    return state.selectedCellId;
};