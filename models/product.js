'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Product name must be filled ."
        }
      }
    },
    info: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Product info must be filled ."
        }
      }
    },
    image: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Product image must be filled ."
        },
        // isUrl : {
        //   msg : "Product image must be URL format thanks."
        // }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        notEmpty : {
          msg : "Product price must be filled ."
        },
        isNumeric : {
          msg : "Price must be a number."
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        notEmpty : {
          msg : "Product stock must be filled ."
        },
        isNumeric : {
          msg : "Stock must be a number."
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};