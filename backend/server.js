require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const profileRoute = require('./route/profileRoute');

const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

app.use("/profile", profileRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("conected to db & server is running on port",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Failed to connect to db",error);
})