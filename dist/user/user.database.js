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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.comparePassword = exports.findByEmail = exports.create = exports.findOne = exports.findAll = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../database");
// Get all users
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query("SELECT id, username, email FROM users");
    return rows;
});
exports.findAll = findAll;
// Get a single user by ID
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
});
exports.findOne = findOne;
// Create a new user
const create = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, salt);
    yield database_1.db.query("INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)", [id, userData.username, userData.email, hashedPassword]);
    return { id, username: userData.username, email: userData.email, password: hashedPassword };
});
exports.create = create;
// Find user by email
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
});
exports.findByEmail = findByEmail;
// Compare Password Function
const comparePassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield database_1.db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0)
        return false;
    return yield bcryptjs_1.default.compare(password, user[0].password);
});
exports.comparePassword = comparePassword;
// Update User Function
const update = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.db.query("UPDATE users SET ? WHERE id = ?", [userData, id]);
    return result;
});
exports.update = update;
// Remove User Function
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.db.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
});
exports.remove = remove;
