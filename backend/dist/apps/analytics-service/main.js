/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/analytics-service/src/analytics-service.controller.ts":
/*!********************************************************************!*\
  !*** ./apps/analytics-service/src/analytics-service.controller.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const analytics_service_service_1 = __webpack_require__(/*! ./analytics-service.service */ "./apps/analytics-service/src/analytics-service.service.ts");
let AnalyticsServiceController = class AnalyticsServiceController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getHello() {
        return this.analyticsService.getHello();
    }
    handleSaleAnalytics(data) {
        console.log('💰 [ANALYTICS] Venta detectada. Analizando datos...');
        console.log(`   - Producto ID: ${data.product}`);
        console.log(`   - Monto ganado: $${data.total}`);
        console.log('   -> Dashboard actualizado.');
        console.log('------------------------------------------------');
    }
};
exports.AnalyticsServiceController = AnalyticsServiceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AnalyticsServiceController.prototype, "getHello", null);
__decorate([
    (0, microservices_1.EventPattern)('sale_created'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnalyticsServiceController.prototype, "handleSaleAnalytics", null);
exports.AnalyticsServiceController = AnalyticsServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof analytics_service_service_1.AnalyticsServiceService !== "undefined" && analytics_service_service_1.AnalyticsServiceService) === "function" ? _a : Object])
], AnalyticsServiceController);


/***/ }),

/***/ "./apps/analytics-service/src/analytics-service.module.ts":
/*!****************************************************************!*\
  !*** ./apps/analytics-service/src/analytics-service.module.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const analytics_service_controller_1 = __webpack_require__(/*! ./analytics-service.controller */ "./apps/analytics-service/src/analytics-service.controller.ts");
const analytics_service_service_1 = __webpack_require__(/*! ./analytics-service.service */ "./apps/analytics-service/src/analytics-service.service.ts");
let AnalyticsServiceModule = class AnalyticsServiceModule {
};
exports.AnalyticsServiceModule = AnalyticsServiceModule;
exports.AnalyticsServiceModule = AnalyticsServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [analytics_service_controller_1.AnalyticsServiceController],
        providers: [analytics_service_service_1.AnalyticsServiceService],
    })
], AnalyticsServiceModule);


/***/ }),

/***/ "./apps/analytics-service/src/analytics-service.service.ts":
/*!*****************************************************************!*\
  !*** ./apps/analytics-service/src/analytics-service.service.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AnalyticsServiceService = class AnalyticsServiceService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AnalyticsServiceService = AnalyticsServiceService;
exports.AnalyticsServiceService = AnalyticsServiceService = __decorate([
    (0, common_1.Injectable)()
], AnalyticsServiceService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************************************!*\
  !*** ./apps/analytics-service/src/main.ts ***!
  \********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const analytics_service_module_1 = __webpack_require__(/*! ./analytics-service.module */ "./apps/analytics-service/src/analytics-service.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(analytics_service_module_1.AnalyticsServiceModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'notifications_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(3004);
    console.log('Analytics Service running on port 3004');
}
bootstrap();

})();

/******/ })()
;