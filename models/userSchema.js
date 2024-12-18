const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profileImg:{
        type:String
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    }
})
const users=mongoose.model('users',userSchema)
module.exports=users