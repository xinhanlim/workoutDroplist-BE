const express = require('express');
const router = express.Router();
const { getAllUser } = require('../data/userData')

router.get('/', async (req, res) =>{
    try{
        const allUser = await getAllUser();
        console.log(allUser);
        res.json(allUser);

    }catch(e){
        console.log(e);
        res.status(500).json({
            "message":"Error Getting All User"
        })
    }
})

module.exports = router;