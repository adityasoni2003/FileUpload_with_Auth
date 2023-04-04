
const express = require("express");
const {connectDB}= require("./config/db");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");

const app = express();




app.use(express.json());
app.use(express.static("content"));
app.use(express.urlencoded({extended:false}));



app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);




const PORT = 1221
app.listen(PORT,()=>{
    console.log("App is running")
    connectDB();
})
