const connect = require('../server/database');
const { ObjectId } = require('mongodb');

async function getUserByEmail(email) {
    try {
        const db = await connect();
        const user = await db.collection('users').findOne({ email });
        return user;
    } catch (e) {
        console.log(e);
    }
}

async function createUser({ email, password, displayName, xp = 0, level = 1, streakDays = 0, lastWorkoutAt = null, badges = [], createdAt = new Date(), updatedAt = new Date() }) {
    try {
        const db = await connect();

        const newDoc = {
            email,
            password,
            displayName,
            xp,
            level,
            streakDays,
            lastWorkoutAt,
            badges,
            createdAt,
            updatedAt
        }
        const result = await db.collection('users').insertOne(newDoc);
        return result;
    } catch (e) {
        console.log(e);
    }
}

async function updateUser(userId, {email, password, displayName,updatedAt} ) {
    try {
        const db = await connect();
        const updatedUser = {
            email,
            password,
            displayName,
            updatedAt
        }
        console.log(updatedUser);

        const result = await db.collection('users').updateOne({ _id: new ObjectId(userId)} , {$set: updatedUser })
        if (result.matchedCount === 0) {
            throw new Error('User not found');
        }
        return result;
    } catch(e){
        console.log(e);
    }
}

module.exports = { getUserByEmail, createUser, updateUser };