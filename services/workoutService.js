const workoutDataLayer = require('../data/workoutData');

async function getAllWorkoutByUser(userId) {
    const userWorkout = await workoutDataLayer.getAllWorkoutByUser(userId);
    return userWorkout;
}

async function createWorkout(_id,notes,sets){
    const newWorkout = await workoutDataLayer.createWorkout(_id, notes, sets)
    return newWorkout;
}

async function updateWorkout(workoutId,notes,sets){
    const updateWorkout= await workoutDataLayer.updateWorkout(workoutId,notes, sets)
    return updateWorkout
}

async function deleteWorkout(workoutId){
    const deleteWorkout = await workoutDataLayer.deleteWorkout(workoutId);
    return deleteWorkout;
}

module.exports = { getAllWorkoutByUser,createWorkout, updateWorkout, deleteWorkout };
