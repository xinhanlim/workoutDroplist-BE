# workoutGamified-BE


# Problem Encountered

### Unable to extract the Id,Name,Weight,Reps,Rpe in the array of Sets of the workout. 
```bash
const result = await db.collection('exercises').find({ name: { $in: regexes } }, { projection: { _id: 1, name: 1 } }).toArray();
console.log(result);
result [
  { _id: new ObjectId('68a4383c1322900ffd4104ed'), name: 'Squat' },
  { _id: new ObjectId('68a4384d1322900ffd4104ef'), name: 'Push-up' }
]
```
in the area , i'm finding based on name to link to user input