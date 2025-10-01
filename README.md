# Workout Droplist — Back-end

- Back-end workout list for personal workout tracking.
- Front-end: https://github.com/xinhanlim/workoutDroplist-FE
- Live Demo: https://workout-droplist-fe.vercel.app

## Features:

- Full **CRUD functionality** for workouts and exercises
- **Exercise filtering** by muscle group
- **Workout search bar** for quick access
- **Responsive UI** optimized for mobile web view
- **Backend RESTful API** built with Express & MongoDB
- **User authentication** with JWT-based login
- **User-specific tagging** — workouts and exercises created by a user are securely linked to their account via JWT

## Tech Stack:

**Frontend:** React, Wouter, Tailwind CSS, Headless UI, Jotai, Axios, Formik, Yup, React-Toastify, jwt-decode  
**Backend:** Node.js, Express, MongoDB, JWT, bcrypt, CORS  
**Dev & Build:** Vite, Nodemon
<br>
**Hosting:** Vercel (frontend), Render (backend)

## Data Structure - MongoDB

Exercise Collection:

```js
{
  "_id": {
    "$oid": "68aec4ceac4e773042f49c50"
  },
  "name": "Push-up",
  "muscleGroup": "Arms",
  "difficulty": "Beginner",
  "createdBy": "System"
}
```

Workout Collection

```js
{
  "_id": {
    "$oid": "68cbd978ac029342944be655"
  },
  "date": {
    "$date": "2025-08-25T04:33:13.462Z"
  },
  "notes": "Sample Workout",
  "sets": [
    {
      "_id": {
        "$oid": "68a4384d1322900ffd4104ef"
      },
      "name": "Push-up",
      "weight": 80,
      "reps": 5,
      "rpe": 8
    }
  ],
  "createdBy": "System"
}
```



## Getting Started

### Clone the repo

```bash
# HTTPS
git clone https://github.com/xinhanlim/workoutDroplist-BE.git
cd workoutDroplist-BE
```

```bash
# SSH
git clone git@github.com:xinhanlim/workoutDroplist-BE.git
cd workoutDroplist-BE
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Vite exposes only variables starting with `VITE_`.

- **Local (Codespaces)** — create a `.env` file in the frontend root:

```env
MONGO_URL=<your_atlas_uri_here>
MONGO_DBNAME=workoutGamified
JWT_SECRET=<your_local_dev_secret >
```

- Production (Vercel + Render) – in Vercel → Project → Settings → Environment Variables:

```.env
CORS_ORIGIN : https://workout-droplist-fe.vercel.app/
JWT_SECRET: <your_local_dev_secret> 
MONGO_URL: <your_atlas_uri_here>
```

## Run Command
Install Nodemon,
```bash
npm install nodemon
```
then follow on with nodemon
```bash
nodemon
```

# Screenshot

- Live Demo: https://workout-droplist-fe.vercel.app

![Live Demo](images/Project1Photo.jpg)


## Problem Encountered

### 1. Unable to extract the Id,Name,Weight,Reps,Rpe in the array of Sets of the workout. 
<details><summary>Expand</summary>

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
