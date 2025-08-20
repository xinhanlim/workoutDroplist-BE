const workoutDataLayer = require('../data/workoutData');

async function getAllWorkoutByUser(userId) {
    const userWorkout = await workoutDataLayer.getAllWorkoutByUser(userId);
    return userWorkout;
}

module.exports = { getAllWorkoutByUser };
