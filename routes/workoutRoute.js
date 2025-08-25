const express = require('express');
const router = express.Router();
const workoutService = require('../services/workoutService');
const verifyToken = require('../middlewares/AuthenticationJWT')
require('dotenv').config();

router.get('/:id/workout',verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const getWorkout = await workoutService.getAllWorkoutByUser(userId);
        res.json({
            getWorkout
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Invalid Email Or Password"
        })
    }
})

router.post('/:id/workout/new',verifyToken, async (req,res) =>{
   try {
        const userId = req.params.id;
        const { notes, sets} = req.body
        const result = await workoutService.createWorkout(userId, notes, sets);
        res.json({
            result
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Invalid Email Or Password"
        })
    } 
})

module.exports = router;