const connect = require('../server/database');

async function getAllUser() {
    try {
        const db = await connect();
        const allUser = await db.collection('users').find({}).toArray();
        console.log(allUser);
        return allUser;
        
    } catch(e) {
        console.log(e);
    }
}


module.exports = { getAllUser };