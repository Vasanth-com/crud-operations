const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose');
require('dotenv').config()

const employeeRoutes = require('./routes/emproutes')
const {notFound,errorHandler} = require('./middleware/errormiddle')


const app = express()
const port = 4000
// app.use(cors())


app.use(cors({credentials:true,origin:"http://localhost:5173"}))


app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/employee',employeeRoutes)


app.use(notFound)
app.use(errorHandler)





app.get("/",(req,res)=>{
        res.send("Api is Working")
})

connect('mongodb://localhost:27017/employee').then(app.listen(port,(req,res)=>{
    console.log(`Server started on http://localhost:${port}`);
}))