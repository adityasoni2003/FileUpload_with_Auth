
const express = require("express");
const {connectDB}= require("./config/db");
const userRoute = require("./routes/user")

const app = express();




app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

app.use("/api/v1/user",userRoute);




const PORT = 1221
app.listen(PORT,()=>{
    console.log("App is running")
    connectDB();
})
