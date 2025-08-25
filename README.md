# workoutGamified-BE


## Problem Encountered

### 1. Unable to extract the Id,Name,Weight,Reps,Rpe in the array of Sets of the workout. 
```bash
const result = await db.collection('exercises').find({ name: { $in: regexes } }, { projection: { _id: 1, name: 1 } }).toArray();
console.log(result);
# result [
#   { _id: new ObjectId('68a4383c1322900ffd4104ed'), name: 'Squat' },
#   { _id: new ObjectId('68a4384d1322900ffd4104ef'), name: 'Push-up' }
# ]
```
in this area , i'm extracting based on name to link to user input. 

```bash
const exerciseDoc = await exerciseDataLayer.getExerciseByName(names);
console.log(exceriseDoc);
# exerciseDoc [
#   { _id: new ObjectId('68a4383c1322900ffd4104ed'), name: 'Squat' },
#   { _id: new ObjectId('68a4384d1322900ffd4104ef'), name: 'Push-up' }
# ]
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
over here i'm unable to show the weight,reps,rpe. because i'm only extracting the exceriseDoc which returns just the name and id. 