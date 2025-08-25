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

async function createWorkout(_id, notes = "", setsInput = []) {
    const names = setsInput.map(s => s.name)
    const exerciseDoc = await exerciseDataLayer.getExerciseByName(names);
    console.log("exerciseDoc", exerciseDoc)
    const norm = x => String(x || "").toLowerCase().replace(/[\s\-_]+/g, "")
    const byName = new Map(exerciseDoc.map(d => [norm(d.name), d]));

    const sets = setsInput.map(s => {
        const match = byName.get(norm(s.name));
        return {
            _id: match._id,   // link to exercise
            name: match.name,        // denormalized name
            weight: s.weight,
            reps: s.reps,
            rpe: s.rpe
        };
    });
    console.log(sets);

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