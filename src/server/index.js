"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var vite_1 = require("vite");
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var app, vite;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = (0, express_1.default)();
                    return [4 /*yield*/, (0, vite_1.createServer)({
                            server: { middlewareMode: true }, // Use true to enable middleware mode
                        })];
                case 1:
                    vite = _a.sent();
                    // Use Vite's middleware to handle HMR, asset requests, etc.
                    app.use(vite.middlewares);
                    // Transform and serve `index.html` for the root route
                    app.get("/", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var html, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    html = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../index.html"), "utf-8");
                                    return [4 /*yield*/, vite.transformIndexHtml(req.url, html)];
                                case 1:
                                    // Transform HTML using Vite (injects HMR, modules, etc.)
                                    html = _a.sent();
                                    // Send the transformed HTML
                                    res.send(html);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    vite.ssrFixStacktrace(e_1);
                                    next(e_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Handle other routes if necessary
                    app.use("*", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var html, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    html = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../index.html"), "utf-8");
                                    return [4 /*yield*/, vite.transformIndexHtml(req.url, html)];
                                case 1:
                                    html = _a.sent();
                                    res.status(200).set({ "Content-Type": "text/html" }).end(html);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_2 = _a.sent();
                                    vite.ssrFixStacktrace(e_2);
                                    next(e_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.listen(3000, function () {
                        console.log("Server is running on http://localhost:3000");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
startServer();
