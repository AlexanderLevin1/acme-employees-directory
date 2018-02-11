const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Employee = conn.define('employee', {
    firstName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // nickName:{
    //     type: Sequelize.ARRAY
    // }
}, {
        getterMethods: {
            fullName() {
                return this.firstName + ' ' + this.lastName;
            }
        },
        setterMethods: {
            nickname(value) {
                const name = value.split(',');
            }
        }
    }
)

const employeeNames = [
    { firstName: 'Albert', lastName: 'Einstein' },
    { firstName: 'John', lastName: 'vM' },
    { firstName: 'Mickey', lastName: 'Mouse' }
];

const sync = () => {
    return conn.sync({ force: true });
};

const seedEmployees = () => {
    return Promise.all(employeeNames.map(name => Employee.create(name)));
};

const seed = () => {
    return seedEmployees();
};

module.exports = {
    models: {
        Employee
    },
    sync,
    seed
}


