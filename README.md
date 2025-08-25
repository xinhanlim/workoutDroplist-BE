# workoutGamified-BE


## Problem Encountered

### 1. Unable to extract the Id,Name,Weight,Reps,Rpe in the array of Sets of the workout. 
<details>

```js
const result = await db.collection('exercises').find({ name: { $in: regexes } }, { projection: { _id: 1, name: 1 } }).toArray();
console.log(result);
// result [
//   { _id: new ObjectId('68a4383c1322900ffd4104ed'), name: 'Squat' },
//  { _id: new ObjectId('68a4384d1322900ffd4104ef'), name: 'Push-up' }
//]
```
in my exerciseDataLayer area , i'm extracting based on name to link to user input. 

```js
const exerciseDoc = await exerciseDataLayer.getExerciseByName(names);
console.log(exceriseDoc);
// exerciseDoc [
//    { _id: new ObjectId('68a4383c1322900ffd4104ed'), name: 'Squat' },
//    { _id: new ObjectId('68a4384d1322900ffd4104ef'), name: 'Push-up' }
//  ]
try {
        const db = await connect();
        const workoutDoc = {
            userId: new ObjectId(_id),
            date: new Date(),
            notes,
            sets: exerciseDoc.map(s => {
             _id: exerciseDoc._id,
             name: exerciseDoc.name,
             weight,
             reps,
             rpe})
        }
        const result = await db.collection('workout').insertOne(workoutDoc);
        return result;
    } catch (e) {
        console.log(e);
    }
```
over here i'm unable to show the weight,reps,rpe. because i'm only extracting the exceriseDoc which returns just the name and id, rest of the field will be null
so i had to find a way to extract the rest of the information such as weight and reps and rpe from the user input and combine it with the exceriseDoc id and name

```js
const name = setsInput.map(s => s.name)
const norm = x => String(x || "").toLowerCase().replace(/[\s\-_]+/g, "")
```
With the **const name** i'm able to get the user input firstly so i can match it up later on from my database.
so i get the **const norm** to eliminate any dashes/spaces for easy comparison of the name of excerise user send

``` js
 const sets = setsInput.map(s => {
        const match = exerciseDoc.find(d => norm(d.name) === norm(s.name));
        return {
            _id: match._id, 
            name: match.name, 
            weight: s.weight,
            reps: s.reps,
            rpe: s.rpe
        };
    });
    console.log(sets);
// [
//    {_id: new ObjectId('68a4384d1322900ffd4104ef'),name: 'Push-up',weight: 80, reps: 5,rpe: 8},
//    {_id: new ObjectId('68a4383c1322900ffd4104ed'),name: 'Squat',weight: 100,reps: 8,rpe: 9}
//  ]
```
and from there i need to merge the information together.
so for each setsInput map happen, **const match** will find through the exceriseDoc to get the name and compared with the user input.
the weight reps and rpe will be directly from the user input.

</details>
