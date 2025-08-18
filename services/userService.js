const userDataLayer = require('../data/userData');

async function getUserByEmail(email) {
    const user = await userDataLayer.getUserByEmail(email)
    return user;
}

module.exports= { getUserByEmail };