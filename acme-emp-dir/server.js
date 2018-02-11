const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

const db = require ('./db/Employee');
const { Employee } = db.models;

app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
    res.locals.path = req.url;
    next();
});

app.get('/', (req, res, next) => {
    Employee.findAll({})
        .then( employees => {
            const count = employees.reduce((acc, e) => {
                acc = acc.concat(e.nickName)
                return acc;
            }, [])
            res.render('layout', { employees, count: count } );
        })
        .catch(next);
})

app.use('/employees', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log( `listening on port ${port}`));

db.sync()
    .then(() => db.seed());



