const mongoose=require('mongoose')
const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    languages:{
        type:String,
        require:true
    },
    github:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:true
    },
    overview:{
        type:String,
        require:true
    },
    projectImg:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    
})
const projects=mongoose.model("projects",projectSchema);
module.exports=projects;