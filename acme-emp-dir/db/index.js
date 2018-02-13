const conn = require('./conn');
const Employee = require('./Employee');

const sync = () => {
    return conn.sync({ force: true });
};

const employeeNames = [
    { firstName: 'Albert', lastName: 'Einstein', nicknames: ['fred', 'flintstone'] },
    { firstName: 'John', lastName: 'vM', nicknames: ['the Rock', 'of Ages', 'Rockstar'] },
    { firstName: 'Mickey', lastName: 'Mouse', nicknames: [] }
];

const seed = () => {
    return Promise.all(employeeNames.map( employee => Employee.create(employee)));
};

module.exports = {
    sync,
    seed,
    models: {
      Employee
    }
  };

