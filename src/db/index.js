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
const connection_js_1 = require("./connection.js");
class Db {
    constructor() { }
    query(sql_1) {
        return __awaiter(this, arguments, void 0, function* (sql, args = []) {
            const client = yield connection_js_1.pool.connect();
            try {
                const result = yield client.query(sql, args);
                return result;
            }
            finally {
                client.release();
            }
        });
    }
    viewAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id;');
        });
    }
}
exports.default = Db;
