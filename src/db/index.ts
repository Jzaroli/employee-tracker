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

    async viewAllEmployees() {
        return this.query(
            'SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.dept_id = departments.dept_id;'
        );
    }

    async viewAllRoles() {
        return this.query(
            'SELECT roles.role_id, roles.title, roles.salary, roles.dept_id, departments.dept_name FROM roles JOIN departments ON roles.dept_id = departments.dept_id;'
        );
    }

    async addDept (department: any) {
        const deptName = department.name;
        return this.query (
            'INSERT INTO departments (dept_name) VALUES ($1)',
            [deptName]
        );
    }
}
