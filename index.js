const express = require('express');
const cors = require('cors');

let app = express();
app.use(cors());

app.get('/', (req, res)=>{
    res.json({
        "message":"hello world"
    })
})

app.listen(3200, () =>{
    console.log("Sever has started")
})