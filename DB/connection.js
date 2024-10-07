const mongoose=require('mongoose');
const connectionString=process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log("mongodb atlas connected succesfully");
    
}).catch((err)=>{
    console.log("mongodb connection failed",err);
})
