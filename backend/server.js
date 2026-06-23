const express = require('express');
const dotenv = require('dotenv');
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

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
app.use('/api/users', userRoutes);

