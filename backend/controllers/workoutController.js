const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

const createWorkout = async (req,res)=>{
    const {title, load, reps} = req.body;

    const emptyFields = [];
    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    }

    try{
        const response = await Workout.create({title, load, reps});
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getWorkouts = async (req,res)=>{
    try{
        const workouts = await Workout.find().sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getWorkout =  async (req,res)=>{
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Workout not found"});
        }
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(400).json({error: "Workout not found"});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteWorkout =  async (req,res)=>{
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Workout not found"});
        }
        const workout = await Workout.findByIdAndDelete(id);
        if(!workout){
            return res.status(400).json({error: "Workout not found"});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateWorkout = async (req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Workout not found"});
    }
    try{
        const workout = await Workout.findByIdAndUpdate(id, req.body, {new: true});
        if(!workout){
            return res.status(400).json({error: "Workout not found"});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout };