require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const profileRoute = require('./route/profileRoute');
const postRoute = require('./route/postRoute');
const bookmarkRoute = require('./route/bookmarkRoute');
const likeRoutes = require("./route/likeRoute");

const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

app.use("/profile", profileRoute);
app.use("/post", postRoute);
app.use("/bookmark", bookmarkRoute);
app.use("/like", likeRoutes);

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