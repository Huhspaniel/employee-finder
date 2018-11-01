employees = require('../data/employees');

module.exports = function (app) {
    app.get('/api/employees', (req, res) => {
        res.json(employees);
    });

    app.post('/api/employees', (req, res) => {
        employees.push(req.body)
        res.json({ success: true });
    })
}