const { ObjectId } = require('mongodb');
const connect = require('../server/database');

async function getAllExercise() {
    try {
        const db = await connect();
        const result = await db.collection('exercises').find({}).toArray();
        return result;
    } catch (e) {
        console.log(e);
    }
}

async function getExerciseByName(name) {
    try {
        const db = await connect();
        const extractName = Array.isArray(name) ? name.map(n => n.name || n ): [name];

        const regexes = extractName.map(n => {
            // remove spaces, hyphens, underscores from input
            const plain = n.toLowerCase().replace(/[\s\-_]+/g, '');
            // build regex that allows those separators optionally between chars
            const pattern = plain.split('').join('[\\s\\-_]?')
            return new RegExp(`^${pattern}$`, 'i');
        });
        const result = await db.collection('exercises').find({ name: { $in: regexes } }, { projection: { _id: 1, name: 1 } }).toArray();
        return result;
    } catch (e) {
        console.log(e);
    }

}

async function createExercise(name, muscleGroup, unit, difficulty, userId) {
    try{
        const db = await connect();
        const newExercise = {
            name,
            muscleGroup,
            unit,
            difficulty,
            createdBy:userId
        }

        const result = await db.collection('exercises').insertOne(newExercise);
        console.log(result);
        return result;
    }catch(e){
        console.log(e);
    }
}

async function updateExercise() {

}
async function deleteExercise() {

}


module.exports = { getAllExercise, getExerciseByName, createExercise, updateExercise, deleteExercise };