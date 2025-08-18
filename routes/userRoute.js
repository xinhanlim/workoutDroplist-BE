const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Error Getting All User"
        })
    }
})

router.post('/register', async (req,res)=>{
    try{
        const {email, password, displayName } = req.body
        const newUserId = await userService.createUser(email,password,displayName);
        console.log(newUserId)
        res.json(newUserId);

    } catch(e) {
         console.log(e);
        res.status(500).json({
            "message": "Error Registering"
        })
    }
})

module.exports = router;