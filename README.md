# workoutGamified-BE


# Problem Encountered

### Unable to extract the Id,Name,Weight,Reps,Rpe in the array of Sets of the workout. 
```bash
const result = await db.collection('exercises').find({ name: { $in: regexes } }, { projection: { _id: 1, name: 1 } }).toArray();
``` 
in the area , i'm finding based on name to link to user input