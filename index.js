
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));



const PORT = 1221
app.listen(PORT,()=>{
    console.log("App is running")
})
