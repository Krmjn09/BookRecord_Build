// first importing express
const express = require("express"); 

const app = express();

const PORT = 8081;

app.use(express.json());  // we are uing the application only in json format

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "server is up and running :-)",
    })
})
 
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})