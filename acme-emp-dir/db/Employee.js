const conn = require('./conn');
const { Sequelize } = conn;

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
    nicknames: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        set: function (value) {
            if ((typeof value) === 'string') {
                var nicknames = value.split(',').filter(v => v.length > 0);
                this.setDataValue('nicknames', nicknames)
            }
            else {
                this.setDataValue('nicknames', value)
            }
        }
    }
}, {
        getterMethods: {
            fullName: function () {
                return `${this.firstName} ${this.lastName}`;
            }
        }
    });

module.exports = Employee;


