const express = require('express');
const dotenv = require('dotenv');
const workoutRoutes = require("./routes/workoutRoutes");
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((error)=>{
    console.error("Error connecting to MongoDB:", error);
})

app.use(express.json());

app.use('/api/workouts', workoutRoutes);

