require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;

const userRouter = require('./routes/userRoute');
const workoutRouter = require('./routes/workoutRoute');




let app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        "message":"hello world"
    })
})

app.use('/api/users', userRouter);
app.use('/api/users/me',workoutRouter);


app.listen(`${PORT}`, () =>{
    console.log(`Sever has started, ${PORT}`)
})