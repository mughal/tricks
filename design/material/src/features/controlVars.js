// state.js
let state = {
    fun: false
};

export const setFun = (value) => {
    state.fun = value;
};

export const getFun = () => {
    return state.fun;
};
