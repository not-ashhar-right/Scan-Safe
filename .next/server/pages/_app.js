/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/AppLayout.tsx":
/*!**********************************!*\
  !*** ./components/AppLayout.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppLayout: () => (/* binding */ AppLayout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst navItems = [\n    {\n        href: \"/\",\n        label: \"Home\"\n    },\n    {\n        href: \"/manufacturer\",\n        label: \"Manufacturer\"\n    },\n    {\n        href: \"/scan\",\n        label: \"Scan / Verify\"\n    },\n    {\n        href: \"/customer\",\n        label: \"Customer\"\n    },\n    {\n        href: \"/admin\",\n        label: \"Admin\"\n    },\n    {\n        href: \"/ai-verify\",\n        label: \"AI Verify\"\n    }\n];\nfunction AppLayout({ children }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"app-root\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n                className: \"app-header\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"app-header-inner\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/\",\n                            className: \"app-logo\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"app-logo-mark\",\n                                    children: \"SS\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                                    lineNumber: 26,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"app-logo-text\",\n                                    children: \"ScanSafe\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                                    lineNumber: 27,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                            lineNumber: 25,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                            className: \"app-nav\",\n                            children: navItems.map((item)=>{\n                                const isActive = router.pathname === item.href;\n                                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: item.href,\n                                    className: \"app-nav-link\" + (isActive ? \" app-nav-link--active\" : \"\"),\n                                    children: item.label\n                                }, item.href, false, {\n                                    fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                                    lineNumber: 33,\n                                    columnNumber: 17\n                                }, this);\n                            })\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                            lineNumber: 29,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                    lineNumber: 24,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"app-main\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"page\",\n                    children: children\n                }, void 0, false, {\n                    fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                    lineNumber: 48,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\components\\\\AppLayout.tsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0FwcExheW91dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBNkI7QUFDVztBQU94QyxNQUFNRSxXQUFXO0lBQ2Y7UUFBRUMsTUFBTTtRQUFLQyxPQUFPO0lBQU87SUFDM0I7UUFBRUQsTUFBTTtRQUFpQkMsT0FBTztJQUFlO0lBQy9DO1FBQUVELE1BQU07UUFBU0MsT0FBTztJQUFnQjtJQUN4QztRQUFFRCxNQUFNO1FBQWFDLE9BQU87SUFBVztJQUN2QztRQUFFRCxNQUFNO1FBQVVDLE9BQU87SUFBUTtJQUNqQztRQUFFRCxNQUFNO1FBQWNDLE9BQU87SUFBWTtDQUMxQztBQUVNLFNBQVNDLFVBQVUsRUFBRUMsUUFBUSxFQUFrQjtJQUNwRCxNQUFNQyxTQUFTTixzREFBU0E7SUFFeEIscUJBQ0UsOERBQUNPO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDQztnQkFBT0QsV0FBVTswQkFDaEIsNEVBQUNEO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ1Qsa0RBQUlBOzRCQUFDRyxNQUFLOzRCQUFJTSxXQUFVOzs4Q0FDdkIsOERBQUNFO29DQUFLRixXQUFVOzhDQUFnQjs7Ozs7OzhDQUNoQyw4REFBQ0U7b0NBQUtGLFdBQVU7OENBQWdCOzs7Ozs7Ozs7Ozs7c0NBRWxDLDhEQUFDRzs0QkFBSUgsV0FBVTtzQ0FDWlAsU0FBU1csR0FBRyxDQUFDLENBQUNDO2dDQUNiLE1BQU1DLFdBQVdSLE9BQU9TLFFBQVEsS0FBS0YsS0FBS1gsSUFBSTtnQ0FDOUMscUJBQ0UsOERBQUNILGtEQUFJQTtvQ0FFSEcsTUFBTVcsS0FBS1gsSUFBSTtvQ0FDZk0sV0FDRSxpQkFBa0JNLENBQUFBLFdBQVcsMEJBQTBCLEVBQUM7OENBR3pERCxLQUFLVixLQUFLO21DQU5OVSxLQUFLWCxJQUFJOzs7Ozs0QkFTcEI7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUlOLDhEQUFDYztnQkFBS1IsV0FBVTswQkFDZCw0RUFBQ0Q7b0JBQUlDLFdBQVU7OEJBQVFIOzs7Ozs7Ozs7Ozs7Ozs7OztBQUkvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3NjYW5zYWZlLW12cC8uL2NvbXBvbmVudHMvQXBwTGF5b3V0LnRzeD84YTlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbnRlcmZhY2UgQXBwTGF5b3V0UHJvcHMge1xyXG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XHJcbn1cclxuXHJcbmNvbnN0IG5hdkl0ZW1zID0gW1xyXG4gIHsgaHJlZjogJy8nLCBsYWJlbDogJ0hvbWUnIH0sXHJcbiAgeyBocmVmOiAnL21hbnVmYWN0dXJlcicsIGxhYmVsOiAnTWFudWZhY3R1cmVyJyB9LFxyXG4gIHsgaHJlZjogJy9zY2FuJywgbGFiZWw6ICdTY2FuIC8gVmVyaWZ5JyB9LFxyXG4gIHsgaHJlZjogJy9jdXN0b21lcicsIGxhYmVsOiAnQ3VzdG9tZXInIH0sXHJcbiAgeyBocmVmOiAnL2FkbWluJywgbGFiZWw6ICdBZG1pbicgfSxcclxuICB7IGhyZWY6ICcvYWktdmVyaWZ5JywgbGFiZWw6ICdBSSBWZXJpZnknIH0sXHJcbl07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXBwTGF5b3V0KHsgY2hpbGRyZW4gfTogQXBwTGF5b3V0UHJvcHMpIHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwLXJvb3RcIj5cclxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJhcHAtaGVhZGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHAtaGVhZGVyLWlubmVyXCI+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL1wiIGNsYXNzTmFtZT1cImFwcC1sb2dvXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFwcC1sb2dvLW1hcmtcIj5TUzwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXBwLWxvZ28tdGV4dFwiPlNjYW5TYWZlPC9zcGFuPlxyXG4gICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJhcHAtbmF2XCI+XHJcbiAgICAgICAgICAgIHtuYXZJdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IHJvdXRlci5wYXRobmFtZSA9PT0gaXRlbS5ocmVmO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TGlua1xyXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaHJlZn1cclxuICAgICAgICAgICAgICAgICAgaHJlZj17aXRlbS5ocmVmfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgICAgICdhcHAtbmF2LWxpbmsnICsgKGlzQWN0aXZlID8gJyBhcHAtbmF2LWxpbmstLWFjdGl2ZScgOiAnJylcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiYXBwLW1haW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj57Y2hpbGRyZW59PC9kaXY+XHJcbiAgICAgIDwvbWFpbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkxpbmsiLCJ1c2VSb3V0ZXIiLCJuYXZJdGVtcyIsImhyZWYiLCJsYWJlbCIsIkFwcExheW91dCIsImNoaWxkcmVuIiwicm91dGVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiaGVhZGVyIiwic3BhbiIsIm5hdiIsIm1hcCIsIml0ZW0iLCJpc0FjdGl2ZSIsInBhdGhuYW1lIiwibWFpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/AppLayout.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_AppLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/AppLayout */ \"./components/AppLayout.tsx\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AppLayout__WEBPACK_IMPORTED_MODULE_2__.AppLayout, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\pages\\\\_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Projects\\\\Scan_Safe_2\\\\pages\\\\_app.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQytCO0FBQ3FCO0FBRXJDLFNBQVNDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDOUQscUJBQ0UsOERBQUNILDREQUFTQTtrQkFDUiw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsid2VicGFjazovL3NjYW5zYWZlLW12cC8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xyXG5pbXBvcnQgeyBBcHBMYXlvdXQgfSBmcm9tICcuLi9jb21wb25lbnRzL0FwcExheW91dCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxBcHBMYXlvdXQ+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgIDwvQXBwTGF5b3V0PlxyXG4gICk7XHJcbn0iXSwibmFtZXMiOlsiQXBwTGF5b3V0IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();