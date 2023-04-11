USE employee_tracker;

INSERT INTO department (name)
VALUES ('Human Resources'), ('Engineering'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 60000, 1), ('Software Engineer', 80000, 2), ('Sales Associate', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Alice', 'Johnson', 3, 1);
