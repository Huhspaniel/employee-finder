const employees = require('../data/employees');
const validate = require('validate.js');

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
        const errors = validate(req.body, {
            name: {
                presence: true,
                length: {
                    minimum: 2,
                    maximum: 30
                },
                format: {
                    pattern: "^[a-z ,.'-]+$",
                    flags: 'i',
                    message: 'Name may only contain alphabet characters'
                }
            },
            photo: {
                url: true
            }
        });
        if (errors) {
            res.json({ errors: errors });
        } else {
            req.body.name = validate.capitalize(req.body.name);
            res.json(getBestMatch(req.body));
            employees.push(req.body);
        }
    })
}