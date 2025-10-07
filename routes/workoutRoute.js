const express = require('express');
const router = express.Router();
const workoutService = require('../services/workoutService');
const verifyToken = require('../middlewares/AuthenticationJWT');
const { ObjectId } = require('mongodb');
require('dotenv').config();

router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await workoutService.getAllWorkout(userId);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Unable to get workout"
        })
    }
})

router.post('/new', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
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
        const workoutId = new ObjectId(req.params.id);
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