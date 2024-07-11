const {Schema,model} = require("mongoose")

const employeeSchema = new Schema({
    jobId:{type:Number,require:true},
    name:{type:String,require:true},
    email:{type:String,require:true},
    city:{type:String,require:true},
    salary:{type:String,require:true}
})

module.exports = model('Employee',employeeSchema)