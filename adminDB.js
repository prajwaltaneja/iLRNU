const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/companySystem', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{ 
    console.log("MONGO DB SETUP");
})
.catch((err)=>{
    console.log("ERROR!!!");
    console.log(err);
});

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        trim: true,
        lowercase: true,
        unique: true,        
    },
    password : {
        type : String,
        required : true
    }
})



const adminInfo = mongoose.model('adminSchema' , adminSchema);
module.exports = adminInfo;