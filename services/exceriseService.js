const exerciseDataLayer = require('../data/exerciseData');

async function getAllExercise(userId) {
    const result = await exerciseDataLayer.getAllExercise(userId);
    return result
}
async function createExercise(name, muscleGroup,difficulty, createdBy) {

    const nameRegex = /^[A-Za-z\s\-]{2,50}$/;
    // - Allows letters, spaces, and hyphens
    // - Between 2 and 50 characters (good for exercise names like "Bench Press", "Pull-up")

    const muscleGroupRegex = /^(Chest|Back|Shoulders|Arms|Legs|Core|Full Body)$/i;
    // - Restricts to a predefined set of muscle groups (case-insensitive)


    const difficultyRegex = /^(Beginner|Intermediate|Advanced)$/i;
    // - Allows one of these difficulty levels

    const createdByRegex = /^[a-f\d]{24}$/i;
    // - Matches a MongoDB ObjectId (24 hex characters)

    if (!nameRegex.test(name)) throw new Error("Invalid exercise name");
    if (!muscleGroupRegex.test(muscleGroup)) throw new Error("Invalid muscle group");
    if (!difficultyRegex.test(difficulty)) throw new Error("Invalid difficulty");
    if (!createdByRegex.test(createdBy)) throw new Error("Invalid creator ID");

    const newExcerise = await exerciseDataLayer.createExercise(
        name,
        muscleGroup,
        difficulty,
        createdBy
    )

    return newExcerise;
}

async function updateExercise( exerciseId , name, muscleGroup, difficulty) {

    const nameRegex = /^[\p{L}\p{N}][\p{L}\p{N}\s'’\-()&/]{1,49}$/u;
    // - Allows letters, spaces, and hyphens
    // - Between 2 and 50 characters (good for exercise names like "Bench Press", "Pull-up")

    const muscleGroupRegex = /^(Chest|Back|Shoulders|Arms|Legs|Core|Full Body)$/i;
    // - Restricts to a predefined set of muscle groups (case-insensitive)

    const unitRegex = /^(kgs|lbs|bodyweight|reps)$/i;
    // - Only allows "kgs", "lbs", or "bodyweight" or "reps" as valid units

    const difficultyRegex = /^(Beginner|Intermediate|Advanced)$/i;
    // - Allows one of these difficulty levels

    if (!nameRegex.test(name)) throw new Error("Invalid exercise name");
    if (!muscleGroupRegex.test(muscleGroup)) throw new Error("Invalid muscle group");
    if (!difficultyRegex.test(difficulty)) throw new Error("Invalid difficulty");

    const updateExercise = await exerciseDataLayer.updateExercise(
        exerciseId,
        name,
        muscleGroup,
        difficulty,
    )
    return updateExercise;
}


async function deleteExercise(exerciseId) {

    const deleteExercise = await exerciseDataLayer.deleteExercise(exerciseId)
    return deleteExercise
}

module.exports = { getAllExercise, createExercise, updateExercise, deleteExercise }