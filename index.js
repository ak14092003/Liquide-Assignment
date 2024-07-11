const express = require('express')
const mongoose = require('mongoose')
const router = require('./Routes/userRoute.js')
const router1 = require('./Routes/tradeRoute.js')

const app = express();
app.use(express.json());
const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})
app.use("/user",router)
app.use("/api",router1)


mongoose.connect("mongodb+srv://tester:tester123@cluster0.qkgrams.mongodb.net/liquideDB?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Database Connected")
}).catch(err => {
    console.log(err)
})