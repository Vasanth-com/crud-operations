const HttpError = require('../models/errormodel')
const Employee = require('../models/empmodel')
const Admin = require("../models/adminmodel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register admin account 

const register = async(req,res,next) =>{
    try {
        const{name,email,password} = req.body;
        if(!name||!email||!password) {
            return next(new HttpError("Fill in all Fields..!",422))
        }
        if((password.trim()).length < 6){
            return next(new HttpError("Password should be at least 6 character.",422))
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)
        const  admin = await Admin.create({name,email,password:hashedPass})
        console.log(admin);
        res.status(201).json(`Admin ${email} Registered Successfully`)

    } catch (error) {
        return next(new HttpError("Registration Failed..!",422))
    }
} 

// login 

const login = async(req,res,next)=>{
    try {
        const{email,password} = req.body;
        if(!email || !password){
            return next(new HttpError("Fill in All fields..!",422))
        }
        const newEmail = email.toLowerCase()
        const admin = await Admin.findOne({email:newEmail})
        if(!admin){
            return next(new HttpError("Invalid credentials.!",422))
        }

        const comparedPass = await bcrypt.compare(password,admin.password)
        if(!comparedPass){
            return next(new HttpError("Password Wrong..!",422))
        }

        const {_id:id,name} = admin
        const token = jwt.sign({id,name},"json#secretkey",{expiresIn:"1d"})
        res.status(200).json({id,token,name})

    } catch (error) {
        return next(new HttpError("Login failed. please check your credentials",422))
    }
}


// create emp

const createEmp = async(req,res,next)=>{
    try {
        const {jobId,name,email,city,salary} =req.body

        if(!jobId || !name || !email || !city || !salary){
            return next(new HttpError('Fill in all Fields',422))
        }

        const newEmail = email.toLowerCase();
        const emailExists = await Employee.findOne({email:newEmail})

        if(emailExists){
            return next(new HttpError("Email Already exists",422))
        }

        const newEmp = await Employee.create({jobId,name,email:newEmail,city,salary})
        console.log(newEmp);

        res.status(201).json(`New Employee ${newEmp} Added..!`)

    } catch (error) {
        return next(new HttpError("failed to add employee details"),422)
    }
}

const getEmployee = async(req,res,next)=>{
    try {
        const emp = await Employee.find()
        res.status(200).json(emp)
    } catch (error) {
        return next(new HttpError(error))        
    }
}
const getSingleEmp = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const employee = await Employee.findById(id)
        if(!employee){
            return next(new HttpError("Your search employee not found..!",403))
        }
        res.status(200).json(employee)
    } catch (error) {
        return next(new HttpError(error))
    }
}

const editDetails = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const{name,city,salary} = req.body
        if(!name || !city || !salary){
            return next(new HttpError("Fill in all fields",422))
        }
        let employee = await Employee.findById(id);
        if(!employee){
            return next(new HttpError("Employee not found..!",403))
        }

        let updateInfo = await Employee.findByIdAndUpdate(id,{name,city,salary},{new:true}) 

        if(!updateInfo){
            return next(new HttpError("Couldn't update post.",400))
        }
        res.status(200).json(updateInfo)
    } catch (error) {
        return next(new HttpError(error))
    }

}

const deleteDetails = async(req,res,next) =>{
    try {
        const id = req.params.id
        console.log(id);
        if(!id){
            return next(new HttpError("Employee unavailable",400))
        }
        const employee = await Employee.findById(id)
        await Employee.findByIdAndDelete(employee)
        res.status(200).json(`Employee ${id} deleted Successfully`,)
    } catch (error) {
        return next(new HttpError(error))
    }
}  


module.exports = {createEmp,getEmployee,register,login,editDetails,deleteDetails,getSingleEmp}