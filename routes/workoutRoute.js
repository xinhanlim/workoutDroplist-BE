const express = require('express');
const router = express.Router();
const workoutService = require('../services/workoutService');
const verifyToken = require('../middlewares/AuthenticationJWT');
const { updateWorkout } = require('../data/workoutData');
const { verify } = require('jsonwebtoken');
require('dotenv').config();

router.get('/:id', verifyToken, async (req, res) => {
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

router.post('/new/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const { notes, sets } = req.body
        const result = await workoutService.createWorkout(userId, notes, sets);
        res.json({
            result
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Exercise doesn't exist in the system"
        })
    }
})

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const workoutId = req.params.id;
        const { notes, sets } = req.body
        const result = await workoutService.updateWorkout(workoutId, notes, sets);
        res.json({ result });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "error"
        })
    }
})

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const workoutId = req.params.id;
        const result = await workoutService.deleteWorkout(workoutId);
        res.json({result});
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Error Deleting"
        })
    }
})
module.exports = router;