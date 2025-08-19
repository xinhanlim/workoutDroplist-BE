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

router.post('/register', async (req, res) => {
    try {
        const { email, password, displayName } = req.body
        const newUserId = await userService.createUser(email, password, displayName);

        res.json({
            "message": "User Registered Successfully",
        });
        return newUserId;

    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Error Registering"
        })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { email, password, displayName } = req.body;
        const updatedUser = await userService.updateUser(userId, { email, password, displayName });
        res.json({
            message: "User Updated Successfully",
        });
        return updatedUser

    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Error Updating User"
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const deleteUser = await userService.deleteUser(userId);
        res.json({
            message: "User Deleted Successfully",
        });
        return deleteUser;
        
    }catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Error Deleting User"
        })
    }
})


module.exports = router;