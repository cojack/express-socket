const { Sequelize, Model, DataTypes } = require('sequelize');
const EventEmitter = require('events');

const sequelize = new Sequelize('mariadb://root:my-secret-pw@localhost:3306/avast', {
    dialect: 'mariadb',
    dialectOptions: {connectTimeout: 1000} // mariadb connector option
});

const userEmitter = new EventEmitter();

class User extends Model {}

User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

module.exports = {
    User,
    userEmitter,
    sequelize
};
