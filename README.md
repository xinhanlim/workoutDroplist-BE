# workoutGamified-BE

Promise { <pending> }
forgot a await when doing db.collection.

When doing a test to getAllUser sample data, return an empty array, due to MONGODB_DBNAME , but in my env it's MONGO_DBNAME

unable to fetch user by email due to , const user = await getUserByEmail(); When calling getUserByEmail() in the route, the function was passing undefined thus leading to undefined,
thus const user = await getUserByEmail(email) , have to include it in the email.

unable to update user due to, userId missing in the userData/userService layer, and that;s why it's having the id that user key in , in the email field. 