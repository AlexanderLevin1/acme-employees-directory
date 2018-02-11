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
    nickName: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        set: function (value) {
            if ((typeof value) === 'string') this.setDataValue('nickName', value.split(','))
        }
    }
}, {
        getterMethods: {
            fullName() {
                return this.firstName + ' ' + this.lastName;
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


