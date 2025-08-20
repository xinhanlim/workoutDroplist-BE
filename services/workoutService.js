const workoutDataLayer = require('../data/workoutData');

async function getAllWorkoutByUser(userId) {
    const userWorkout = await workoutDataLayer.getAllWorkoutByUser(userId);
    return userWorkout;
}

async function createWorkout(userId,notes,sets){
    const newWorkout = await workoutDataLayer.createWorkout(userId, notes,sets)
    return newWorkout;
}

module.exports = { getAllWorkoutByUser,createWorkout };
