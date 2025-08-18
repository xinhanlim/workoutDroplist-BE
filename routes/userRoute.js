const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../services/userService');

router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        console.log(email)
        const user = await getUserByEmail(email);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Error Getting All User"
        })
    }
})

module.exports = router;