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

module.exports = {connectDB , createDB}