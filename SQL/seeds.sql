INSERT INTO department(name)
VALUES ('Kitchen'),
       ('Cashier'),
       ('Janitor');

INSERT INTO role(title, salary, department_id)
VALUES ('Chef', 5.00, 1),
       ('main_cashier',10.00, 2),
	   ('mast_custodian',50.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Silly','Goose',1,1),
       ('Quick','Quack',2,0),
       ('Mallard','Zucklberg',3,0);