import { pool } from './connection.js';

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

    async viewAllDepartments() {
        return this.query(
            'SELECT * FROM departments;'
        );
    }

    async returnDept() {
        return this.query(
            'SELECT dept_id FROM roles;'
        );
    }

    async viewAllEmployees() {
        return this.query(
            'SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, employees.manager, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id;'
        );
    }

    async viewAllRoles() {
        return this.query(
            'SELECT roles.role_id, roles.title, roles.salary, departments.dept_name FROM roles JOIN departments ON roles.dept_id = departments.dept_id;'
        );
    }

    async addDept (department: any) {
        const deptName = department.name;
        return this.query (
            'INSERT INTO departments (dept_name) VALUES ($1)',
            [deptName]
        );
    }

    async addRole (role: any) {
        return this.query (
            'INSERT INTO roles (title, salary, dept_id) VALUES ($1, $2, $3)',
            [role.title, role.salary, role.department]
        );
    }

    async addEmp (employee: any) {
        return this.query (
            'INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ($1, $2, $3, $4)',
            [employee.fName, employee.lName, employee.role, employee.manager || null]
        );
    }

    async returnManager() {
        return this.query(
            'SELECT manager FROM employees WHERE manager IS NOT NULL'
        );
    }

    async returnRole() {
        return this.query(
            'SELECT role_id FROM employees'
        );
    }
}
