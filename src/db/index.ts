import { pool } from './connection.js';

// Create class DB, async query function and associated methods for manipulating data:
export default class Db {
    constructor() {}

    async query(sql: string, args: any[] = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        } finally {
            client.release();
        }
    }

// Selects all from departments:
    async viewAllDepartments() {
        return this.query(
            'SELECT * FROM departments ORDER BY dept_id ASC;'
        );
    }

// Selects dept for add role function:
    async returnDept() {
        return this.query(
            'SELECT dept_id FROM departments;'
        );
    }
    
// Selects important infromation for employees view:
    async viewAllEmployees() {
        return this.query(
            'SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, employees.manager, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id ORDER BY employee_id ASC;'
        );
    }

// Selects important role information for roles view:
    async viewAllRoles() {
        return this.query(
            'SELECT roles.role_id, roles.title, roles.salary, departments.dept_name FROM roles JOIN departments ON roles.dept_id = departments.dept_id ORDER BY role_id ASC;'
        );
    }

// Inserts new department information into departments table:
    async addDept (department: any) {
        const deptName = department.name;
        return this.query (
            'INSERT INTO departments (dept_name) VALUES ($1)',
            [deptName]
        );
    }

// Inserts new department information into departments table:
    async addRole (role: any) {
        return this.query (
            'INSERT INTO roles (title, salary, dept_id) VALUES ($1, $2, $3)',
            [role.title, role.salary, role.department]
        );
    }

// Inserts new employee information into employees table:
    async addEmp (employee: any) {
        return this.query (
            'INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ($1, $2, $3, $4)',
            [employee.fName, employee.lName, employee.role, employee.manager || null]
        );
    }

// Returns manager for add employee function:
    async returnManager() {
        return this.query(
            `SELECT manager FROM employees WHERE manager <> $1`, 
            ['None']
        );
    }

// Returns role for add employee function:
    async returnRole() {
        return this.query(
            'SELECT role_id FROM roles'
        );
    }

// Returns existing employees for udpate employee function:
    async returnExistEmps() {
        return this.query(
            'SELECT first_name, last_name, employee_id FROM employees'
        );
    }

// Updates existing employee in employees table:
    async updateEmp(employeeInfo: any) {
        return this.query(
            'UPDATE employees SET first_name = $2, last_name = $3, role_id = $4, manager = $5 WHERE employee_id = $1',
            [employeeInfo.finalId, employeeInfo.finalFName, employeeInfo.finalLName, employeeInfo.finalRole, employeeInfo.finalManager]    
        );
    }
}



