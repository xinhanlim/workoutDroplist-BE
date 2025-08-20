const connect = require('../server/database');

async function getAllExercise() {
    try {
        const db = await connect();
        const result = await db.collection('exercises').find({}).toArray();
        console.log(result);
        return result;
    } catch(e) {
        console.log(e);
    }
}

async function getExerciseById(id){

}

async function createExercise(){

}

async function deleteExerise(){

}


module.exports = { getAllExercise ,getExerciseById, createExercise, deleteExerise};