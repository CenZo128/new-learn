'use strict';
const {encryptPwd} = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product);
    }
  };
  User.init({
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Username must be filled thanks."
        },
        isEmail : {
          msg : "Username must be email format."
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Pwd must be filled thanks."
        }
      }
    },
  }, {
    hooks : {
      beforeCreate(user){
        user.password = encryptPwd(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};