require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;

const userRouter = require('./routes/userRoute');
const workoutRouter = require('./routes/workoutRoute');
const exerciseRouter = require('./routes/exerciseRoute')


let app = express();
app.use(cors({ origin: ['https://workout-droplist-fe.vercel.app'], credentials: true }));
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        "message":"hello world"
    })
})

app.use('/api/users', userRouter);
app.use('/api/users/workout',workoutRouter);
app.use('/api/users/exercise',exerciseRouter);


app.listen(`${PORT}`, () =>{
    console.log(`Sever has started, ${PORT}`)
})