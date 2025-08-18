const bcrypt = require('bcrypt');
const userDataLayer = require('../data/userData');
const userValidation = require('../middlewares/userValidation');

async function getUserByEmail(email) {
    const user = await userDataLayer.getUserByEmail(email)
    return user;
}

async function createUser(email, password, displayName) {
    const errors = userValidation({ email, password, displayName });
    if (errors.length) {
        const err = new Error(errors.join(', '));
        err.code = 'VALIDATION';
        throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await userDataLayer.createUser({
        email,
        hashedPassword,
        displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    return newUserId
}

module.exports = { getUserByEmail, createUser };