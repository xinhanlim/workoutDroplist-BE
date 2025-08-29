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
    const name = setsInput.map(s => s.name)
    const exerciseDoc = await exerciseDataLayer.getExerciseByName(name);
    const norm = x => String(x || "").toLowerCase().replace(/[\s\-_]+/g, "")

    const sets = setsInput.map(s => {
        const match = exerciseDoc.find(d => norm(d.name) === norm(s.name));
        console.log(match);
        return {
            exerciseId: match._id,
            name: match.name,
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

async function updateWorkout(workoutId,notes,setsInput =[]) {

    const name = setsInput.map(s => s.name)
   const exerciseDoc = await exerciseDataLayer.getExerciseByName(name);
   const norm = x => String(x || "").toLowerCase().replace(/[\s\-_]+/g, "")
   console.log("exerciseDoc", exerciseDoc);

    const sets = setsInput.map(s => {
        const match = exerciseDoc.find(d => norm(d.name) === norm(s.name));
        return {
            exerciseId: match._id,
            name: match.name,
            weight: s.weight,
            reps: s.reps,
            rpe: s.rpe
        };
    });

    const _id = new ObjectId(workoutId);

    try {
        const db = await connect();
        const updatedWorkout = {
            notes,
            sets,
            updatedAt: new Date()
        }
        console.log("updatedWorkout",updatedWorkout);
        const result = await db.collection('workout').updateOne({ _id}, { $set: updatedWorkout });

        return result;
    } catch (e) {
        console.log(e);
    }
}

async function deleteWorkout(workoutId){
    try{
        const db = await connect();
        const result = await db.collection('workout').deleteOne({_id: new ObjectId(workoutId)});
        return result;
    }catch(e){
        console.log(e);
    }
}

module.exports = { getAllWorkoutByUser, createWorkout, updateWorkout, deleteWorkout };