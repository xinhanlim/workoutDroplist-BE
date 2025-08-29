const bcrypt = require('bcrypt');
const userDataLayer = require('../data/userData');
const userValidation = require('../ultis/userValidation');

async function getUserByEmail(email) {
    const user = await userDataLayer.getUserByEmail(email)
    return user;
}

async function createUser(email, password, displayName) {
    const errors = userValidation({ displayName, email, password });
    if (errors.length) {
        const error = new Error(errors.join(', '));
        error.code = 'VALIDATION';
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await userDataLayer.createUser({
        email,
        password:hashedPassword,
        displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    return newUserId
}

async function updateUser(userId,{displayName, email, password, }) {
    const errors = userValidation({ displayName, email, password,  });
    if (errors.length) {
        const err = new Error(errors.join(', '));
        err.code = 'VALIDATION';
        throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userDataLayer.updateUser(userId, {email,password:hashedPassword, displayName,updatedAt: new Date() });
    return updatedUser
}

async function deleteUser(userId) {
    const deletedUser = await userDataLayer.deleteUser(userId);
    return deletedUser;
}

module.exports = { getUserByEmail, createUser, updateUser , deleteUser};