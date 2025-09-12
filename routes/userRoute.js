const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/AuthenticationJWT')
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.getUserByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                "message": "Invalid Email or Password"
            })
        }
        const token = jwt.sign({
            'userId': user._id,
            'displayName': user.displayName
        }, process.env.JWT_SECRET,
            {
                'expiresIn': "3h"
            })
        res.json({
            message: "Login successful",
            token
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
           "error" : e,
           "message": "Invalid Email Or Password"
        })
    }
})

router.post('/register', async (req, res) => {
    try {
        const { email, password, displayName } = req.body;
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

router.put('/me/:id',verifyToken, async (req, res) => {
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

router.delete('/me/:id',verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteUser = await userService.deleteUser(userId);
        res.json({
            message: "User Deleted Successfully",
        });
        return deleteUser;

    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Error Deleting User"
        })
    }
})


module.exports = router;