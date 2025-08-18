const express = require('express');
const cors = require('cors');

let app = express();
app.use(cors);



app.listen(3000, () =>{
    console.log("Sever has started")
})