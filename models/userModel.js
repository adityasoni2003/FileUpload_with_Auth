const {Model,DataTypes} = require("sequelize");
const {createDB} = require("../config/db");



const User = createDB.define("users",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true

    },
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    pass:DataTypes.STRING,
    isSeller :{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
});

module.exports = User;
