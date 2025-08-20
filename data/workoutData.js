const { ObjectId } = require('mongodb');
const connect = require('../server/database');

async function getAllWorkoutByUser(userId){
    try{
        const db = await connect();
        const result = await db.collection('workout').find({userId: new ObjectId(userId)}).toArray();
        return result;
    }catch(e){
        console.log(e);
    }
}

module.exports= { getAllWorkoutByUser };