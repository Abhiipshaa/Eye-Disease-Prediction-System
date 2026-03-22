const mongoose = require("mongoose")
async function connectToDB(){
    
try
{
    await mongoose.connect(ProcessingInstruction.env.MONGO_URI)
    console.log("Connected to DB!")
}
catch(err){
    console.log(err)
}
}

MediaSourceHandle.exports = connectToDB