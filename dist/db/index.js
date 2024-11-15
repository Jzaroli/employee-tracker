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
// Create class DB, async query function and associated methods for manipulating data:
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
    // Selects all from departments:
    viewAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('SELECT * FROM departments ORDER BY dept_id ASC;');
        });
    }
    // Selects dept for add role function:
    returnDept() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('SELECT dept_id FROM departments;');
        });
    }
    // Selects important infromation for employees view:
    viewAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, employees.manager, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id ORDER BY employee_id ASC;');
        });
    }
    // Selects important role information for roles view:
    viewAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('SELECT roles.role_id, roles.title, roles.salary, departments.dept_name FROM roles JOIN departments ON roles.dept_id = departments.dept_id ORDER BY role_id ASC;');
        });
    }
    // Inserts new department information into departments table:
    addDept(department) {
        return __awaiter(this, void 0, void 0, function* () {
            const deptName = department.name;
            return this.query('INSERT INTO departments (dept_name) VALUES ($1)', [deptName]);
        });
    }
    // Inserts new department information into departments table:
    addRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('INSERT INTO roles (title, salary, dept_id) VALUES ($1, $2, $3)', [role.title, role.salary, role.department]);
        });
    }
    // Inserts new employee information into employees table:
    addEmp(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ($1, $2, $3, $4)', [employee.fName, employee.lName, employee.role, employee.manager || null]);
        });
    }
    // Returns manager for add employee function:
    returnManager() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query(`SELECT manager FROM employees WHERE manager <> $1`, ['None']);
        });
    }
    // Returns role for add employee function:
    returnRole() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('SELECT role_id FROM roles');
        });
    }
    // Returns existing employees for udpate employee function:
    returnExistEmps() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('SELECT first_name, last_name, employee_id FROM employees');
        });
    }
    // Updates existing employee in employees table:
    updateEmp(employeeInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query('UPDATE employees SET first_name = $2, last_name = $3, role_id = $4, manager = $5 WHERE employee_id = $1', [employeeInfo.finalId, employeeInfo.finalFName, employeeInfo.finalLName, employeeInfo.finalRole, employeeInfo.finalManager]);
        });
    }
}
exports.default = Db;
