
const express = require('express')
const cors = require('cors')
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin:'http://localhost:8080'
}))

//routes
app.use(require('./routes/index'))

app.listen(3000)

console.log("http://localhost:3000")