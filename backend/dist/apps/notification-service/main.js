/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/notification-service/src/notification-service.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/notification-service/src/notification-service.controller.ts ***!
  \**************************************************************************/
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
exports.NotificationServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const notification_service_service_1 = __webpack_require__(/*! ./notification-service.service */ "./apps/notification-service/src/notification-service.service.ts");
let NotificationServiceController = class NotificationServiceController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    handleSaleCreated(data) {
        console.log('📧 ¡NUEVA NOTIFICACIÓN RECIBIDA!');
        console.log(`Mensaje: Se ha registrado la venta #${data.saleId}`);
        console.log(`Enviar correo a: ${data.email}`);
        console.log('------------------------------------------------');
    }
};
exports.NotificationServiceController = NotificationServiceController;
__decorate([
    (0, microservices_1.EventPattern)('sale_created'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationServiceController.prototype, "handleSaleCreated", null);
exports.NotificationServiceController = NotificationServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_service_1.NotificationServiceService !== "undefined" && notification_service_service_1.NotificationServiceService) === "function" ? _a : Object])
], NotificationServiceController);


/***/ }),

/***/ "./apps/notification-service/src/notification-service.module.ts":
/*!**********************************************************************!*\
  !*** ./apps/notification-service/src/notification-service.module.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_service_controller_1 = __webpack_require__(/*! ./notification-service.controller */ "./apps/notification-service/src/notification-service.controller.ts");
const notification_service_service_1 = __webpack_require__(/*! ./notification-service.service */ "./apps/notification-service/src/notification-service.service.ts");
let NotificationServiceModule = class NotificationServiceModule {
};
exports.NotificationServiceModule = NotificationServiceModule;
exports.NotificationServiceModule = NotificationServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [notification_service_controller_1.NotificationServiceController],
        providers: [notification_service_service_1.NotificationServiceService],
    })
], NotificationServiceModule);


/***/ }),

/***/ "./apps/notification-service/src/notification-service.service.ts":
/*!***********************************************************************!*\
  !*** ./apps/notification-service/src/notification-service.service.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let NotificationServiceService = class NotificationServiceService {
    getHello() {
        return 'Hello World!';
    }
};
exports.NotificationServiceService = NotificationServiceService;
exports.NotificationServiceService = NotificationServiceService = __decorate([
    (0, common_1.Injectable)()
], NotificationServiceService);


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
/*!***********************************************!*\
  !*** ./apps/notification-service/src/main.ts ***!
  \***********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const notification_service_module_1 = __webpack_require__(/*! ./notification-service.module */ "./apps/notification-service/src/notification-service.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(notification_service_module_1.NotificationServiceModule);
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
    await app.listen(3003);
    console.log('Notification Service running on port 3003 (Listening RabbitMQ)');
}
bootstrap();

})();

/******/ })()
;