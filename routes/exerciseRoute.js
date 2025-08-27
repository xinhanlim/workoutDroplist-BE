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

module.exports = router;
