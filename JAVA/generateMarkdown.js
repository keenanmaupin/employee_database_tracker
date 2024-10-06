

// *This is my PORT info
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// *WHEN I choose to view all departments
app.get('/api/SQL/schema.sql/department', (_req, res) => {
    const sql = `SELECT * FROM department`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});
// *WHEN I choose to view all roles
app.get('/api/SQL/schema.sql/role', (_req, res) => {
    const sql = `SELECT * FROM role`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});
// *WHEN I choose to view all employees
app.get('/api/SQL/schema.sql/employee', (_req, res) => {
    const sql = `SELECT * FROM employee`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});
// * WHEN I choose to ADD a department
// ! I still need to add the prompt to ADD THE NAME OF DEPARTMENT
// ? OR DID I ALREADY
app.post('/api/SQL/schema.sql/department', (req, res) => {
    const { name } = req.body;
    const sql = `INSERT INTO department (name)`;
    pool.query(sql, [name], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'department added successfully',
            data: result,
        });
    });
});
// *WHEN I choose to add a role
app.post('/api/SQL/schema.sql/role', (req, res) => {
    const { title, salary, department_id } = req.body;
    const sql = `INSERT INTO role (title, salary, department_id)`;
    pool.query(sql, [title, salary, department_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'role added successfully',
            data: result,
        });
    });
});
// *WHEN I choose to add an employee
app.post('/api/SQL/schema.sql/employee', (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)`;
    pool.query(sql, [first_name, last_name, role_id, manager_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'employee added successfully',
            data: result,
        });
    });
});
// *WHEN I choose to update an employee role   
app.put('/api/SQL/schema.sql/employee/role', (req, res) => {
    const { employee_id, role_id } = req.body;
    const sql = `UPDATE employee SET role_id =? WHERE id =?`;
    pool.query(sql, [role_id, employee_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'employee role updated successfully',
            data: result,
        });
    });
});

app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
