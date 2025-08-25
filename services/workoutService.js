const workoutDataLayer = require('../data/workoutData');

async function getAllWorkoutByUser(userId) {
    const userWorkout = await workoutDataLayer.getAllWorkoutByUser(userId);
    return userWorkout;
}

async function createWorkout(userId,notes,sets,weight, reps, rpe){
    const newWorkout = await workoutDataLayer.createWorkout(userId, notes,sets,weight,reps,rpe)
    return newWorkout;
}

module.exports = { getAllWorkoutByUser,createWorkout };
