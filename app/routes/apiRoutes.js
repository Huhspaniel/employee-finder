employees = require('../data/employees');

function getTotalDifferences(userScores) {
    const totalDifferences = [];
    employees.forEach((employee) => {
        let totalDifference = 0;
        for (let i = 0; i < userScores.length; i++) {
            totalDifference += Math.abs(userScores[i] - employee.scores[i]);
        }
        totalDifferences.push(totalDifference);
    })
    return totalDifferences;
}

function getBestMatch(user) {
    const totalDifferences = getTotalDifferences(user.scores);
    const bestDif = Math.min(...totalDifferences);
    return employees[
        totalDifferences.findIndex((dif) => {
            return (dif === bestDif);
        })
    ];
}

module.exports = function (app) {
    app.get('/api/employees', (req, res) => {
        res.json(employees);
    });

    app.post('/api/employees', (req, res) => {
        res.json(getBestMatch(req.body));
        employees.push(req.body);
    })
}