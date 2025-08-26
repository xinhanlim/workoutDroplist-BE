const express = require('express');
const router = express.Router();
const exerciseServiceLayer = require('../services/exceriseService');
const verifyToken = require('../middlewares/AuthenticationJWT')
require('dotenv').config();

router.post('/:id/new' ,verifyToken , async (req,res) => {
    try{
        const userId = req.params.id;
        const { name, muscleGroup, unit, difficulty,createdBy } = req.body
        console.log(req.body);
        const result = await exerciseServiceLayer.createExercise(name, muscleGroup,unit,difficulty,createdBy = userId)
        return result

    }catch(e){
        console.log(e);
        res.status(500).json({
            "error": e,
            "message": "Error creating new exercises"
        })
    }
})

module.exports = router;
