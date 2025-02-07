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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const uuid_1 = require("uuid");
const database_1 = require("../database");
// Get all products
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query("SELECT * FROM products");
    return rows;
});
exports.findAll = findAll;
// Get a single product by ID
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
});
exports.findOne = findOne;
// Create a new product
const create = (productInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const { name, price, quantity, image } = productInfo;
    yield database_1.db.query("INSERT INTO products (id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?)", [id, name, price, quantity, image]);
    return Object.assign({ id }, productInfo);
});
exports.create = create;
// Update an existing product
const update = (id, updateValues) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, quantity, image } = updateValues;
    const [result] = yield database_1.db.query("UPDATE products SET name = ?, price = ?, quantity = ?, image = ? WHERE id = ?", [name, price, quantity, image, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    return Object.assign({ id }, updateValues);
});
exports.update = update;
// Delete a product
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield database_1.db.query("DELETE FROM products WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
        return null;
    }
});
exports.remove = remove;
