/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/inventory-service/src/inventory-service.controller.ts":
/*!********************************************************************!*\
  !*** ./apps/inventory-service/src/inventory-service.controller.ts ***!
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
exports.InventoryServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const inventory_service_service_1 = __webpack_require__(/*! ./inventory-service.service */ "./apps/inventory-service/src/inventory-service.service.ts");
let InventoryServiceController = class InventoryServiceController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    create(body) {
        return this.inventoryService.create(body);
    }
    findAll() {
        return this.inventoryService.findAll();
    }
    decreaseStock(id, quantity) {
        return this.inventoryService.decreaseStock(id, quantity);
    }
};
exports.InventoryServiceController = InventoryServiceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/decrease'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], InventoryServiceController.prototype, "decreaseStock", null);
exports.InventoryServiceController = InventoryServiceController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [typeof (_a = typeof inventory_service_service_1.InventoryServiceService !== "undefined" && inventory_service_service_1.InventoryServiceService) === "function" ? _a : Object])
], InventoryServiceController);


/***/ }),

/***/ "./apps/inventory-service/src/inventory-service.module.ts":
/*!****************************************************************!*\
  !*** ./apps/inventory-service/src/inventory-service.module.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const inventory_service_controller_1 = __webpack_require__(/*! ./inventory-service.controller */ "./apps/inventory-service/src/inventory-service.controller.ts");
const inventory_service_service_1 = __webpack_require__(/*! ./inventory-service.service */ "./apps/inventory-service/src/inventory-service.service.ts");
const product_entity_1 = __webpack_require__(/*! ./products/entities/product.entity */ "./apps/inventory-service/src/products/entities/product.entity.ts");
let InventoryServiceModule = class InventoryServiceModule {
};
exports.InventoryServiceModule = InventoryServiceModule;
exports.InventoryServiceModule = InventoryServiceModule = __decorate([
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
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
        ],
        controllers: [inventory_service_controller_1.InventoryServiceController],
        providers: [inventory_service_service_1.InventoryServiceService],
    })
], InventoryServiceModule);


/***/ }),

/***/ "./apps/inventory-service/src/inventory-service.service.ts":
/*!*****************************************************************!*\
  !*** ./apps/inventory-service/src/inventory-service.service.ts ***!
  \*****************************************************************/
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
exports.InventoryServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const product_entity_1 = __webpack_require__(/*! ./products/entities/product.entity */ "./apps/inventory-service/src/products/entities/product.entity.ts");
let InventoryServiceService = class InventoryServiceService {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    create(data) {
        const newProduct = this.productRepo.create(data);
        return this.productRepo.save(newProduct);
    }
    findAll() {
        return this.productRepo.find();
    }
    async decreaseStock(id, quantity) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        if (product.stock < quantity) {
            throw new Error('No hay suficiente stock');
        }
        product.stock = product.stock - quantity;
        return this.productRepo.save(product);
    }
};
exports.InventoryServiceService = InventoryServiceService;
exports.InventoryServiceService = InventoryServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], InventoryServiceService);


/***/ }),

/***/ "./apps/inventory-service/src/products/entities/product.entity.ts":
/*!************************************************************************!*\
  !*** ./apps/inventory-service/src/products/entities/product.entity.ts ***!
  \************************************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Product = class Product {
    id;
    name;
    price;
    stock;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);


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

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

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
/*!********************************************!*\
  !*** ./apps/inventory-service/src/main.ts ***!
  \********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const inventory_service_module_1 = __webpack_require__(/*! ./inventory-service.module */ "./apps/inventory-service/src/inventory-service.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(inventory_service_module_1.InventoryServiceModule);
    await app.listen(3001);
    console.log('Inventory Service running on port 3001');
}
bootstrap();

})();

/******/ })()
;