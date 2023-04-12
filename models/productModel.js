const {Model , DataTypes} = require("sequelize")
const {createDB} = require("../config/db")


class Product extends Model {};

Product.init({

    id:{
        primaryKey:true,
        autoIncrement:true,
       
        type:DataTypes.INTEGER,
        allowNull:false,

        
    },
    name:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.NUMBER
    },
    content:{
        type:DataTypes.STRING
    }
},{
    sequelize:createDB,
    modelName:"products"
});

module.exports = Product;