const mongoose=require('mongoose');
const settingsSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
  
    from_address:{
        type:String,
        required:false,
        
    },
    logo:{
        type:String,
        required:false
    }
})
module.exports=mongoose.model("setting",settingsSchema);