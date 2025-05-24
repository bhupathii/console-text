"use strict";
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
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../../node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_hvign_Desktop_console_text_packages_dashboard_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\hvign\\\\Desktop\\\\console-text\\\\packages\\\\dashboard\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_hvign_Desktop_console_text_packages_dashboard_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyLmpzP25hbWU9YXBwJTJGYXBpJTJGYXV0aCUyRiU1Qi4uLm5leHRhdXRoJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZS50cyZhcHBEaXI9QyUzQSU1Q1VzZXJzJTVDaHZpZ24lNUNEZXNrdG9wJTVDY29uc29sZS10ZXh0JTVDcGFja2FnZXMlNUNkYXNoYm9hcmQlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2h2aWduJTVDRGVza3RvcCU1Q2NvbnNvbGUtdGV4dCU1Q3BhY2thZ2VzJTVDZGFzaGJvYXJkJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMwRDtBQUN2STtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL0Bjb25zb2xlLXRleHQvZGFzaGJvYXJkLz9iNjYzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGh2aWduXFxcXERlc2t0b3BcXFxcY29uc29sZS10ZXh0XFxcXHBhY2thZ2VzXFxcXGRhc2hib2FyZFxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcaHZpZ25cXFxcRGVza3RvcFxcXFxjb25zb2xlLXRleHRcXFxccGFja2FnZXNcXFxcZGFzaGJvYXJkXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/../../node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/../../node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/../../node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\n\n// Check if all required environment variables are present\nconst requiredEnvVars = {\n    DATABASE_URL: process.env.DATABASE_URL,\n    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,\n    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,\n    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET\n};\nconst missingVars = Object.entries(requiredEnvVars).filter(([_, value])=>!value).map(([key])=>key);\n// Create error handler for missing environment variables\nconst createErrorHandler = ()=>{\n    return ()=>{\n        return new Response(JSON.stringify({\n            error: \"Authentication not configured\",\n            missing: missingVars\n        }), {\n            status: 500,\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    };\n};\n// Create NextAuth handler when all variables are present\nconst createAuthHandler = ()=>{\n    return next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n        providers: [\n            (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n                clientId: process.env.GOOGLE_CLIENT_ID,\n                clientSecret: process.env.GOOGLE_CLIENT_SECRET\n            })\n        ],\n        adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma),\n        pages: {\n            signIn: \"/auth/signin\",\n            newUser: \"/onboarding\"\n        },\n        session: {\n            strategy: \"jwt\"\n        },\n        callbacks: {\n            async jwt ({ token, user }) {\n                if (user) {\n                    token.userId = user.id;\n                    token.credits = user.credits;\n                }\n                return token;\n            },\n            async session ({ session, token }) {\n                if (token?.userId && session.user) {\n                    session.user.id = token.userId;\n                    session.user.credits = token.credits;\n                }\n                return session;\n            },\n            async signIn ({ user, account, profile }) {\n                if (account?.provider === \"google\") {\n                    try {\n                        const existingUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                            where: {\n                                email: user.email\n                            }\n                        });\n                        if (!existingUser) {\n                            await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.create({\n                                data: {\n                                    email: user.email,\n                                    name: user.name,\n                                    image: user.image,\n                                    credits: 10,\n                                    accounts: {\n                                        create: {\n                                            type: account.type,\n                                            provider: account.provider,\n                                            providerAccountId: account.providerAccountId,\n                                            access_token: account.access_token,\n                                            token_type: account.token_type,\n                                            scope: account.scope,\n                                            id_token: account.id_token,\n                                            expires_at: account.expires_at,\n                                            session_state: account.session_state,\n                                            refresh_token: account.refresh_token\n                                        }\n                                    }\n                                }\n                            });\n                        }\n                        return true;\n                    } catch (error) {\n                        console.error(\"Sign in error:\", error);\n                        return false;\n                    }\n                }\n                return true;\n            }\n        }\n    });\n};\n// Export the appropriate handler based on configuration\nconst handler = missingVars.length > 0 ? createErrorHandler() : createAuthHandler();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpQztBQUN1QjtBQUNIO0FBQ2Y7QUFrQnRDLDBEQUEwRDtBQUMxRCxNQUFNSSxrQkFBa0I7SUFDdEJDLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsWUFBWTtJQUN0Q0csa0JBQWtCRixRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtJQUM5Q0Msc0JBQXNCSCxRQUFRQyxHQUFHLENBQUNFLG9CQUFvQjtJQUN0REMsaUJBQWlCSixRQUFRQyxHQUFHLENBQUNHLGVBQWU7QUFDOUM7QUFFQSxNQUFNQyxjQUFjQyxPQUFPQyxPQUFPLENBQUNULGlCQUNoQ1UsTUFBTSxDQUFDLENBQUMsQ0FBQ0MsR0FBR0MsTUFBTSxHQUFLLENBQUNBLE9BQ3hCQyxHQUFHLENBQUMsQ0FBQyxDQUFDQyxJQUFJLEdBQUtBO0FBRWxCLHlEQUF5RDtBQUN6RCxNQUFNQyxxQkFBcUI7SUFDekIsT0FBTztRQUNMLE9BQU8sSUFBSUMsU0FDVEMsS0FBS0MsU0FBUyxDQUFDO1lBQ2JDLE9BQU87WUFDUEMsU0FBU2I7UUFDWCxJQUNBO1lBQ0VjLFFBQVE7WUFDUkMsU0FBUztnQkFBRSxnQkFBZ0I7WUFBbUI7UUFDaEQ7SUFFSjtBQUNGO0FBRUEseURBQXlEO0FBQ3pELE1BQU1DLG9CQUFvQjtJQUN4QixPQUFPM0IsZ0RBQVFBLENBQUM7UUFDZDRCLFdBQVc7WUFDVDNCLHNFQUFjQSxDQUFDO2dCQUNiNEIsVUFBVXZCLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO2dCQUN0Q3NCLGNBQWN4QixRQUFRQyxHQUFHLENBQUNFLG9CQUFvQjtZQUNoRDtTQUNEO1FBQ0RzQixTQUFTN0IsbUVBQWFBLENBQUNDLCtDQUFNQTtRQUM3QjZCLE9BQU87WUFDTEMsUUFBUTtZQUNSQyxTQUFTO1FBQ1g7UUFDQUMsU0FBUztZQUNQQyxVQUFVO1FBQ1o7UUFDQUMsV0FBVztZQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUlBLE1BQU07b0JBQ1JELE1BQU1FLE1BQU0sR0FBR0QsS0FBS0UsRUFBRTtvQkFDdEJILE1BQU1JLE9BQU8sR0FBR0gsS0FBS0csT0FBTztnQkFDOUI7Z0JBQ0EsT0FBT0o7WUFDVDtZQUNBLE1BQU1KLFNBQVEsRUFBRUEsT0FBTyxFQUFFSSxLQUFLLEVBQUU7Z0JBQzlCLElBQUlBLE9BQU9FLFVBQVVOLFFBQVFLLElBQUksRUFBRTtvQkFDakNMLFFBQVFLLElBQUksQ0FBQ0UsRUFBRSxHQUFHSCxNQUFNRSxNQUFNO29CQUM5Qk4sUUFBUUssSUFBSSxDQUFDRyxPQUFPLEdBQUdKLE1BQU1JLE9BQU87Z0JBQ3RDO2dCQUNBLE9BQU9SO1lBQ1Q7WUFDQSxNQUFNRixRQUFPLEVBQUVPLElBQUksRUFBRUksT0FBTyxFQUFFQyxPQUFPLEVBQUU7Z0JBQ3JDLElBQUlELFNBQVNFLGFBQWEsVUFBVTtvQkFDbEMsSUFBSTt3QkFDRixNQUFNQyxlQUFlLE1BQU01QywrQ0FBTUEsQ0FBQ3FDLElBQUksQ0FBQ1EsVUFBVSxDQUFDOzRCQUNoREMsT0FBTztnQ0FDTEMsT0FBT1YsS0FBS1UsS0FBSzs0QkFDbkI7d0JBQ0Y7d0JBRUEsSUFBSSxDQUFDSCxjQUFjOzRCQUNqQixNQUFNNUMsK0NBQU1BLENBQUNxQyxJQUFJLENBQUNXLE1BQU0sQ0FBQztnQ0FDdkJDLE1BQU07b0NBQ0pGLE9BQU9WLEtBQUtVLEtBQUs7b0NBQ2pCRyxNQUFNYixLQUFLYSxJQUFJO29DQUNmQyxPQUFPZCxLQUFLYyxLQUFLO29DQUNqQlgsU0FBUztvQ0FDVFksVUFBVTt3Q0FDUkosUUFBUTs0Q0FDTkssTUFBTVosUUFBUVksSUFBSTs0Q0FDbEJWLFVBQVVGLFFBQVFFLFFBQVE7NENBQzFCVyxtQkFBbUJiLFFBQVFhLGlCQUFpQjs0Q0FDNUNDLGNBQWNkLFFBQVFjLFlBQVk7NENBQ2xDQyxZQUFZZixRQUFRZSxVQUFVOzRDQUM5QkMsT0FBT2hCLFFBQVFnQixLQUFLOzRDQUNwQkMsVUFBVWpCLFFBQVFpQixRQUFROzRDQUMxQkMsWUFBWWxCLFFBQVFrQixVQUFVOzRDQUM5QkMsZUFBZW5CLFFBQVFtQixhQUFhOzRDQUNwQ0MsZUFBZXBCLFFBQVFvQixhQUFhO3dDQUN0QztvQ0FDRjtnQ0FDRjs0QkFDRjt3QkFDRjt3QkFDQSxPQUFPO29CQUNULEVBQUUsT0FBT3pDLE9BQU87d0JBQ2QwQyxRQUFRMUMsS0FBSyxDQUFDLGtCQUFrQkE7d0JBQ2hDLE9BQU87b0JBQ1Q7Z0JBQ0Y7Z0JBQ0EsT0FBTztZQUNUO1FBQ0Y7SUFDRjtBQUNGO0FBRUEsd0RBQXdEO0FBQ3hELE1BQU0yQyxVQUNKdkQsWUFBWXdELE1BQU0sR0FBRyxJQUFJaEQsdUJBQXVCUTtBQUVQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGNvbnNvbGUtdGV4dC9kYXNoYm9hcmQvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlJztcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAYXV0aC9wcmlzbWEtYWRhcHRlclwiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcblxyXG4vLyBFeHRlbmQgTmV4dEF1dGggdHlwZXNcclxuZGVjbGFyZSBtb2R1bGUgXCJuZXh0LWF1dGhcIiB7XHJcbiAgaW50ZXJmYWNlIFNlc3Npb24ge1xyXG4gICAgdXNlcjoge1xyXG4gICAgICBpZDogc3RyaW5nO1xyXG4gICAgICBuYW1lPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgZW1haWw/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICBpbWFnZT86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgIGNyZWRpdHM/OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpbnRlcmZhY2UgVXNlciB7XHJcbiAgICBjcmVkaXRzPzogbnVtYmVyO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQ2hlY2sgaWYgYWxsIHJlcXVpcmVkIGVudmlyb25tZW50IHZhcmlhYmxlcyBhcmUgcHJlc2VudFxyXG5jb25zdCByZXF1aXJlZEVudlZhcnMgPSB7XHJcbiAgREFUQUJBU0VfVVJMOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwsXHJcbiAgR09PR0xFX0NMSUVOVF9JRDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCxcclxuICBHT09HTEVfQ0xJRU5UX1NFQ1JFVDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQsXHJcbiAgTkVYVEFVVEhfU0VDUkVUOiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbn07XHJcblxyXG5jb25zdCBtaXNzaW5nVmFycyA9IE9iamVjdC5lbnRyaWVzKHJlcXVpcmVkRW52VmFycylcclxuICAuZmlsdGVyKChbXywgdmFsdWVdKSA9PiAhdmFsdWUpXHJcbiAgLm1hcCgoW2tleV0pID0+IGtleSk7XHJcblxyXG4vLyBDcmVhdGUgZXJyb3IgaGFuZGxlciBmb3IgbWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuY29uc3QgY3JlYXRlRXJyb3JIYW5kbGVyID0gKCkgPT4ge1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFxyXG4gICAgICBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZXJyb3I6IFwiQXV0aGVudGljYXRpb24gbm90IGNvbmZpZ3VyZWRcIixcclxuICAgICAgICBtaXNzaW5nOiBtaXNzaW5nVmFycyxcclxuICAgICAgfSksXHJcbiAgICAgIHtcclxuICAgICAgICBzdGF0dXM6IDUwMCxcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIENyZWF0ZSBOZXh0QXV0aCBoYW5kbGVyIHdoZW4gYWxsIHZhcmlhYmxlcyBhcmUgcHJlc2VudFxyXG5jb25zdCBjcmVhdGVBdXRoSGFuZGxlciA9ICgpID0+IHtcclxuICByZXR1cm4gTmV4dEF1dGgoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgIEdvb2dsZVByb3ZpZGVyKHtcclxuICAgICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCEsXHJcbiAgICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCEsXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcclxuICAgIHBhZ2VzOiB7XHJcbiAgICAgIHNpZ25JbjogXCIvYXV0aC9zaWduaW5cIixcclxuICAgICAgbmV3VXNlcjogXCIvb25ib2FyZGluZ1wiLFxyXG4gICAgfSxcclxuICAgIHNlc3Npb246IHtcclxuICAgICAgc3RyYXRlZ3k6IFwiand0XCIsXHJcbiAgICB9LFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgdG9rZW4udXNlcklkID0gdXNlci5pZDtcclxuICAgICAgICAgIHRva2VuLmNyZWRpdHMgPSB1c2VyLmNyZWRpdHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgICBpZiAodG9rZW4/LnVzZXJJZCAmJiBzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLnVzZXJJZCBhcyBzdHJpbmc7XHJcbiAgICAgICAgICBzZXNzaW9uLnVzZXIuY3JlZGl0cyA9IHRva2VuLmNyZWRpdHMgYXMgbnVtYmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgc2lnbkluKHsgdXNlciwgYWNjb3VudCwgcHJvZmlsZSB9KSB7XHJcbiAgICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSBcImdvb2dsZVwiKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwhLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFleGlzdGluZ1VzZXIpIHtcclxuICAgICAgICAgICAgICBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCEsXHJcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSEsXHJcbiAgICAgICAgICAgICAgICAgIGltYWdlOiB1c2VyLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgICBjcmVkaXRzOiAxMCwgLy8gRGVmYXVsdCBjcmVkaXRzIGZyb20gc2NoZW1hXHJcbiAgICAgICAgICAgICAgICAgIGFjY291bnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBhY2NvdW50LnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcjogYWNjb3VudC5wcm92aWRlcixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyQWNjb3VudElkOiBhY2NvdW50LnByb3ZpZGVyQWNjb3VudElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBhY2NvdW50LmFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgICAgICAgICAgIHRva2VuX3R5cGU6IGFjY291bnQudG9rZW5fdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBhY2NvdW50LnNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaWRfdG9rZW46IGFjY291bnQuaWRfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBleHBpcmVzX2F0OiBhY2NvdW50LmV4cGlyZXNfYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlOiBhY2NvdW50LnNlc3Npb25fc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiBhY2NvdW50LnJlZnJlc2hfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2lnbiBpbiBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIEV4cG9ydCB0aGUgYXBwcm9wcmlhdGUgaGFuZGxlciBiYXNlZCBvbiBjb25maWd1cmF0aW9uXHJcbmNvbnN0IGhhbmRsZXIgPVxyXG4gIG1pc3NpbmdWYXJzLmxlbmd0aCA+IDAgPyBjcmVhdGVFcnJvckhhbmRsZXIoKSA6IGNyZWF0ZUF1dGhIYW5kbGVyKCk7XHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07Il0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwicHJpc21hIiwicmVxdWlyZWRFbnZWYXJzIiwiREFUQUJBU0VfVVJMIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsIk5FWFRBVVRIX1NFQ1JFVCIsIm1pc3NpbmdWYXJzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsIl8iLCJ2YWx1ZSIsIm1hcCIsImtleSIsImNyZWF0ZUVycm9ySGFuZGxlciIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwibWlzc2luZyIsInN0YXR1cyIsImhlYWRlcnMiLCJjcmVhdGVBdXRoSGFuZGxlciIsInByb3ZpZGVycyIsImNsaWVudElkIiwiY2xpZW50U2VjcmV0IiwiYWRhcHRlciIsInBhZ2VzIiwic2lnbkluIiwibmV3VXNlciIsInNlc3Npb24iLCJzdHJhdGVneSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwidXNlciIsInVzZXJJZCIsImlkIiwiY3JlZGl0cyIsImFjY291bnQiLCJwcm9maWxlIiwicHJvdmlkZXIiLCJleGlzdGluZ1VzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbCIsImNyZWF0ZSIsImRhdGEiLCJuYW1lIiwiaW1hZ2UiLCJhY2NvdW50cyIsInR5cGUiLCJwcm92aWRlckFjY291bnRJZCIsImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiLCJzY29wZSIsImlkX3Rva2VuIiwiZXhwaXJlc19hdCIsInNlc3Npb25fc3RhdGUiLCJyZWZyZXNoX3Rva2VuIiwiY29uc29sZSIsImhhbmRsZXIiLCJsZW5ndGgiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRztBQUVuRSxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AY29uc29sZS10ZXh0L2Rhc2hib2FyZC8uL3NyYy9saWIvcHJpc21hLnRzPzAxZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xyXG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/@opentelemetry","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/@auth"], () => (__webpack_exec__("(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chvign%5CDesktop%5Cconsole-text%5Cpackages%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();