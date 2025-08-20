const { ObjectId } = require('mongodb');
const connect = require('../server/database');


async function getAllWorkoutByUser(userId) {
    try {
        const db = await connect();
        const result = await db.collection('workout').find({ userId: new ObjectId(userId) }).toArray();
        return result;
    } catch (e) {
        console.log(e);
    }
}

async function createWorkout(userId,notes,name) {
    try {
        const db = await connect();
        const exerciseDoc = await db.collection('exercises').find({name: { $in: name }}).toArray();

        const workoutDoc = {
            userId: new ObjectId(userId),
            date: new Date(),
            notes,
            sets: exerciseDoc.map(s =>({
             name: s.name,
            }))
        }
        console.log(workoutDoc);
        const result = await db.collection('workout').insertOne(workoutDoc);
        return result;

    }catch(e){
        console.log(e);
    }
}

module.exports = { getAllWorkoutByUser, createWorkout };