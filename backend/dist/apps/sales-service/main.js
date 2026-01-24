/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/sales-service/src/sales-service.controller.ts":
/*!************************************************************!*\
  !*** ./apps/sales-service/src/sales-service.controller.ts ***!
  \************************************************************/
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
exports.SalesServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sales_service_service_1 = __webpack_require__(/*! ./sales-service.service */ "./apps/sales-service/src/sales-service.service.ts");
let SalesServiceController = class SalesServiceController {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    createSale(body) {
        return this.salesService.create(body);
    }
    getSales() {
        return this.salesService.findAll();
    }
};
exports.SalesServiceController = SalesServiceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesServiceController.prototype, "createSale", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalesServiceController.prototype, "getSales", null);
exports.SalesServiceController = SalesServiceController = __decorate([
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_service_service_1.SalesServiceService !== "undefined" && sales_service_service_1.SalesServiceService) === "function" ? _a : Object])
], SalesServiceController);


/***/ }),

/***/ "./apps/sales-service/src/sales-service.module.ts":
/*!********************************************************!*\
  !*** ./apps/sales-service/src/sales-service.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const sales_service_controller_1 = __webpack_require__(/*! ./sales-service.controller */ "./apps/sales-service/src/sales-service.controller.ts");
const sales_service_service_1 = __webpack_require__(/*! ./sales-service.service */ "./apps/sales-service/src/sales-service.service.ts");
const sale_entity_1 = __webpack_require__(/*! ./sales/entities/sale.entity */ "./apps/sales-service/src/sales/entities/sale.entity.ts");
let SalesServiceModule = class SalesServiceModule {
};
exports.SalesServiceModule = SalesServiceModule;
exports.SalesServiceModule = SalesServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'admin',
                password: 'password123',
                database: 'aso_db',
                autoLoadEntities: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([sale_entity_1.Sale]),
            axios_1.HttpModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'NOTIFICATION_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'notifications_queue',
                        queueOptions: {
                            durable: false,
                        },
                    },
                },
            ]),
        ],
        controllers: [sales_service_controller_1.SalesServiceController],
        providers: [sales_service_service_1.SalesServiceService],
    })
], SalesServiceModule);


/***/ }),

/***/ "./apps/sales-service/src/sales-service.service.ts":
/*!*********************************************************!*\
  !*** ./apps/sales-service/src/sales-service.service.ts ***!
  \*********************************************************/
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const sale_entity_1 = __webpack_require__(/*! ./sales/entities/sale.entity */ "./apps/sales-service/src/sales/entities/sale.entity.ts");
let SalesServiceService = class SalesServiceService {
    saleRepo;
    httpService;
    clientRabbit;
    constructor(saleRepo, httpService, clientRabbit) {
        this.saleRepo = saleRepo;
        this.httpService = httpService;
        this.clientRabbit = clientRabbit;
    }
    async create(data) {
        try {
            await (0, rxjs_1.lastValueFrom)(this.httpService.patch(`http://localhost:3001/products/${data.productId}/decrease`, { quantity: data.quantity }));
        }
        catch (error) {
            console.error('Error stock:', error.message);
            throw new Error('Stock insuficiente');
        }
        const newSale = this.saleRepo.create(data);
        const savedSale = await this.saleRepo.save(newSale);
        this.clientRabbit.emit('sale_created', {
            saleId: savedSale.id,
            product: data.productId,
            total: data.totalPrice,
            email: 'admin@empresa.com'
        });
        return savedSale;
    }
    findAll() {
        return this.saleRepo.find();
    }
};
exports.SalesServiceService = SalesServiceService;
exports.SalesServiceService = SalesServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __param(2, (0, common_1.Inject)('NOTIFICATION_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], SalesServiceService);


/***/ }),

/***/ "./apps/sales-service/src/sales/entities/sale.entity.ts":
/*!**************************************************************!*\
  !*** ./apps/sales-service/src/sales/entities/sale.entity.ts ***!
  \**************************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sale = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Sale = class Sale {
    id;
    productId;
    quantity;
    totalPrice;
    soldAt;
};
exports.Sale = Sale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Sale.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Sale.prototype, "soldAt", void 0);
exports.Sale = Sale = __decorate([
    (0, typeorm_1.Entity)('sales')
], Sale);


/***/ }),

/***/ "@nestjs/axios":
/*!********************************!*\
  !*** external "@nestjs/axios" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@nestjs/axios");

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

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

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
/*!****************************************!*\
  !*** ./apps/sales-service/src/main.ts ***!
  \****************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const sales_service_module_1 = __webpack_require__(/*! ./sales-service.module */ "./apps/sales-service/src/sales-service.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(sales_service_module_1.SalesServiceModule);
    await app.listen(3002);
    console.log('Sales Service running on port 3002');
}
bootstrap();

})();

/******/ })()
;