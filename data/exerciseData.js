const { ObjectId } = require('mongodb');
const connect = require('../server/database');

async function getAllExercise(userId) {
    try {
        const db = await connect();
        const filter = {
            $or: [
                { createdBy: { $regex: "^system$", $options: "i" } },
                { createdBy: new ObjectId(userId) }
            ]
        }
        const result = await db.collection('exercises').find(filter).toArray();
        return result;
    } catch (e) {
        console.log(e);
    }
}

async function getExerciseByName(name) {
    try {
        const db = await connect();
        const extractName = Array.isArray(name) ? name.map(n => (typeof n === "string" ? n : n?.name)) : [name];
        console.log(extractName)

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

async function createExercise(name, muscleGroup, difficulty, userId) {
    try {
        const db = await connect();
        const newExercise = {
            name,
            muscleGroup,
            difficulty,
            createdBy: userId
        }

        const result = await db.collection('exercises').insertOne(newExercise);
        return result;
    } catch (e) {
        console.log(e);
    }
}

async function updateExercise(exerciseId, name, muscleGroup, difficulty) {
    try {

        const db = await connect();
        console.log('Looking for exercise with ID:', exerciseId);
        const ex = await db.collection('exercises').findOne({ _id: new ObjectId(exerciseId) });
        console.log('Found exerciseId:', exerciseId);
        console.log('Found exercise:', ex);
        const updatedExercise = {
            _id: new ObjectId(exerciseId),
            name,
            muscleGroup,
            difficulty
        }
        console.log('Updating with data:', updatedExercise);

        const result = await db.collection('exercises').findOneAndUpdate(
            { _id: new ObjectId(exerciseId) },
            { $set: updatedExercise },
            { returnDocument: 'after' }

        )
        console.log('findOneAndUpdate value:', result);
        return result;

    } catch (e) {
        console.log(e);
    }
}
async function deleteExercise(exerciseId) {
    try {
        const db = await connect();
        console.log('Looking for exercise with ID:', exerciseId);
        const ex = await db.collection('exercises').findOne({ _id: new ObjectId(exerciseId) });
        if ((ex.name).toLowerCase() === 'system') {
            const err = new Error("System exercises can't be deleted");
            throw err
        }
        console.log("Found Exercise Id : ", ex._id)
        console.log("Deleting Exercise Id : ", ex._id)

        const result = await db.collection('exercises').deleteOne({ _id: new ObjectId(exerciseId) })
        console.log("Delete Successfully")
        return result
    } catch (e) {
        console.log(e);
    }
}


module.exports = { getAllExercise, getExerciseByName, createExercise, updateExercise, deleteExercise };