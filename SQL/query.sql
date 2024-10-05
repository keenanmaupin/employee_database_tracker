SELECT name, title, salary, first_name, last_name, manager_id 
FROM department
INNER JOIN role
ON department.id = role.department_id
INNER JOIN employee
ON role.id = employee.role_id


     