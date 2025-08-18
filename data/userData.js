const connect = require('../server/database');
const { ObjectId } = require('mongodb');

async function getUserByEmail(email) {
    try {
        const db = await connect();
        const user = await db.collection('users').findOne({email});
        return user;
    } catch (e) {
        console.log(e);
    }
}

async function createUser(){
    try{
        const db = await connect();
    } catch(e){
        console.log(e);
        }
    }

module.exports = { getUserByEmail, createUser };