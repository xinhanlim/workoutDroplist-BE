const { ObjectId } = require('mongodb');
const connect = require('../server/database');
const exerciseDataLayer = require('./exerciseData')


async function getAllWorkoutByUser(userId) {
    try {
        const db = await connect();
        const result = await db.collection('workout').find({ userId: new ObjectId(userId) }).toArray();
        return result;
    } catch (e) {
        console.log(e);
    }
}

async function createWorkout(_id, notes,sets) {
    try {
        const db = await connect();
        const workoutDoc = {
            userId: new ObjectId(_id),
            date: new Date(),
            notes,
            sets
        }
        const result = await db.collection('workout').insertOne(workoutDoc);
        return result;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { getAllWorkoutByUser, createWorkout };