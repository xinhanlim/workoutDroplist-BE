require('dotenv').config();
const { MongoClient } = require("mongodb");
const mongoURL = process.env.MONGO_URL;
const dbName = process.env.MONGO_DBNAME;


async function connect() {
    let client = await MongoClient.connect(mongoURL);
    let db = client.db(dbName);
    return db;
}

module.exports = connect;