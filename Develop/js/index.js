const inquirer = require('inquirer');
const queries = require('./queries');

async function mainMenu() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (answer.choice) {
    case 'View all departments':
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      await viewAllEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      process.exit();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      mainMenu();
  }
}

async function viewAllDepartments() {
  try {
    const departments = await queries.getAllDepartments();
    console.table(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
  mainMenu();
}

async function viewAllRoles() {
  try {
    const roles = await queries.getAllRoles();
    console.table(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
  mainMenu();
}

async function viewAllEmployees() {
  try {
    const employees = await queries.getAllEmployees();
    console.table(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
  mainMenu();
}

async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new department?',
    },
  ]);

  try {
    await queries.addDepartment(answer.name);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }
  mainMenu();
}

async function addRole() {
  const departments = await queries.getAllDepartments();

  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new role?',
      validate: (value) => {
        if (isNaN(value)) {
          return 'Please enter a valid number';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Which department does the role belong to?',
      choices: departmentChoices,
    },
  ]);

  try {
    await queries.addRole(answer.title, answer.salary, answer.department_id);
    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error);
  }
  mainMenu();
}

async function addEmployee() {
  const roles = await queries.getAllRoles();
  const employees = await queries.getAllEmployees();

  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const managerChoices = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  managerChoices.unshift({ name: 'None', value: null });

  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee?',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'What is the role of the new employee?',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Who is the manager of the new employee?',
      choices: managerChoices,
    },
  ]);

  try {
    await queries.addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
  mainMenu();
}

async function updateEmployeeRole() {
  const employees = await queries.getAllEmployees();
  const roles = await queries.getAllRoles();

  const employeeChoices = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Which employee\'s role do you want to update?',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Which role do you want to assign the selected employee?',
      choices: roleChoices,
    },
  ]);

  try {
    await queries.updateEmployeeRole(answer.employee_id, answer.role_id);
    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
  mainMenu();
}

mainMenu();
