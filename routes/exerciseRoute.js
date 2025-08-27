const express = require('express');
const router = express.Router();
const exerciseServiceLayer = require('../services/exceriseService');
const verifyToken = require('../middlewares/AuthenticationJWT')
require('dotenv').config();
const { ObjectId } = require('mongodb');

router.post('/:id/new' ,verifyToken , async (req,res) => {
    try{
        const userId = req.params.id;
        const { name, muscleGroup, unit, difficulty} = req.body
        console.log(req.body);
        const result = await exerciseServiceLayer.createExercise(name, muscleGroup,unit,difficulty,createdBy = new ObjectId(userId))
        res.json({result});

    }catch(e){
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Error creating new exercises"
        })
    }
})

router.put('/:id/update' ,verifyToken , async (req,res) => {
    try{
        let exerciseId = req.params.id
        let { name, unit} = req.body
        console.log(req.body);
        const result = await exerciseServiceLayer.updateExercise(exerciseId= new ObjectId(exerciseId),name, unit )
        res.json({result});

    }catch(e){
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Error creating new exercises"
        })
    }
})

router.delete('/:id/delete', verifyToken, async (req,res) =>{
    try{
        let exerciseId = req.params.id;
        const result = await exerciseServiceLayer.deleteExercise(exerciseId)
        res.json({
            "message":" You Have Successfully Deleted The Exercise",
            result});
    }catch(e){
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Error creating new exercises"
        })
    }
})
module.exports = router;
