/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/aboutTab.js":
/*!*************************!*\
  !*** ./src/aboutTab.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   aboutTab: () => (/* binding */ aboutTab)\n/* harmony export */ });\n// aboutTab.js\r\n\r\n// Define the function separately\r\nfunction aboutTab() {\r\n    \r\n    const header = document.createElement('h1');\r\n    const paragraph = document.createElement('p');\r\n    header.textContent = 'Welcome to the About Page';\r\n    paragraph.textContent = 'This is the About page content.';\r\n\r\n    content.appendChild(header);\r\n    content.appendChild(paragraph);\r\n}\r\n\r\n// Export the function at the end of the module\r\n\r\n\n\n//# sourceURL=webpack://tricks/./src/aboutTab.js?");

/***/ }),

/***/ "./src/homeTab.js":
/*!************************!*\
  !*** ./src/homeTab.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   homeTab: () => (/* binding */ homeTab)\n/* harmony export */ });\n// homeTab.js\r\n\r\n// Define the function separately\r\nfunction homeTab() {\r\n    \r\n    const header = document.createElement('h1');\r\n    const paragraph = document.createElement('p');\r\n    header.textContent = 'Welcome to the Home Page';\r\n    paragraph.textContent = 'This is the home page content.';\r\n\r\n    content.appendChild(header);\r\n    content.appendChild(paragraph);\r\n}\r\n\r\n// Export the function at the end of the module\r\n\r\n\n\n//# sourceURL=webpack://tricks/./src/homeTab.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _homeTab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homeTab.js */ \"./src/homeTab.js\");\n/* harmony import */ var _menuTab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menuTab.js */ \"./src/menuTab.js\");\n/* harmony import */ var _aboutTab_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aboutTab.js */ \"./src/aboutTab.js\");\n\r\n\r\n\r\n\r\n// Helper function to clear existing content\r\nfunction clearContent() {\r\n    const content = document.querySelector('#content');\r\n    while (content.firstChild) {\r\n        content.removeChild(content.firstChild);\r\n    }\r\n}\r\n\r\n// Add event listener to the entire navigation\r\nconst nav = document.querySelector('nav');\r\nclearContent();\r\nnav.addEventListener('click', function(event) {\r\n    const buttonId = event.target.id;\r\n    switch (buttonId) {\r\n        case 'home':\r\n            clearContent();\r\n            (0,_homeTab_js__WEBPACK_IMPORTED_MODULE_0__.homeTab)();\r\n            break;\r\n        case 'menu':\r\n            clearContent();\r\n            (0,_menuTab_js__WEBPACK_IMPORTED_MODULE_1__.menuTab)();\r\n            break;\r\n        case 'about':\r\n            clearContent();\r\n            (0,_aboutTab_js__WEBPACK_IMPORTED_MODULE_2__.aboutTab)();\r\n            break;\r\n        default:\r\n            clearContent(); // Clears content if an unknown button is clicked\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://tricks/./src/index.js?");

/***/ }),

/***/ "./src/menuTab.js":
/*!************************!*\
  !*** ./src/menuTab.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   menuTab: () => (/* binding */ menuTab)\n/* harmony export */ });\n// menuTab.js\r\n\r\n// Define the function separately\r\nfunction menuTab() {\r\n    \r\n    const header = document.createElement('h1');\r\n    const paragraph = document.createElement('p');\r\n    header.textContent = 'Welcome to the Menu Page';\r\n    paragraph.textContent = 'This is the Menu page content.';\r\n\r\n    content.appendChild(header);\r\n    content.appendChild(paragraph);\r\n}\r\n\r\n// Export the function at the end of the module\r\n\r\n\n\n//# sourceURL=webpack://tricks/./src/menuTab.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;