const app = require('express').Router();
const models = require('../db/Employee').models;
const { Employee } = models;

module.exports = app;

app.get('/', (req, res, next) => {
    Employee.findAll({})
        .then(employees => {
            const count = employees.reduce((acc, e) => {
                acc = acc.concat(e.nickName)
                return acc;
            }, [])
            res.render('employees', { employees, title: 'Employees' , count: count});
        })
        .catch(next);
});

app.get('/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => {
            res.render('employee', { employee, title: 'Employee' })
        })
        .catch(next);
})

app.post('/', (req, res, next) => {
    Employee.create(req.body)
        .then(employee => res.redirect('/employees'))
        .catch(next);
});

app.put('/:id', (req, res, next) => {
    Employee.findById(req.params.id)
    .then ( employee => employee.update(req.body))
    .then(() => res.redirect('/employees'))
    .catch(next);
})

app.delete('/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => employee.destroy())
        .then(() => res.redirect('/employees'))
        .catch(next);
});




