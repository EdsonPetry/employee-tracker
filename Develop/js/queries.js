const mysql = require('mysql2');
const connection = require('./connection');

class Queries {
  async getAllDepartments() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM department';
      connection.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async getAllRoles() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id';
      connection.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async getAllEmployees() {
    return new Promise((resolve, reject) => {
      const query = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                     FROM employee e
                     LEFT JOIN employee m ON e.manager_id = m.id
                     INNER JOIN role ON e.role_id = role.id
                     INNER JOIN department ON role.department_id = department.id`;
      connection.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async addDepartment(name) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, [name], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async addRole(title, salary, department_id) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(query, [title, salary, department_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async addEmployee(first_name, last_name, role_id, manager_id) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      connection.query(query, [first_name, last_name, role_id, manager_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async updateEmployeeRole(employee_id, role_id) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      connection.query(query, [role_id, employee_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = new Queries();
