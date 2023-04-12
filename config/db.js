const Sequelize = require("sequelize");
const createDB = new Sequelize("test-db","user","pass",{
    dialect:"sqlite",
    host:"./config/db.sqlite"
});

const connectDB = ()=>{
    createDB.sync().then(()=>{
        console.log("DB is connected");

    }).catch((e)=>{
        console.log("A Problem occurs" , e);
    })
}

const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");

// Association to link userModel to orderModel
orderModel.belongsTo(userModel, { foreignKey: "buyerID" });
userModel.hasMany(orderModel, { foreignKey: "id" });


module.exports = {connectDB , createDB}