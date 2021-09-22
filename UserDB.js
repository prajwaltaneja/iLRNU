// name, email, phone number, password 
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/companySystem', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{ 
    console.log("MONGO DB SETUP");
})
.catch((err)=>{
    console.log("ERROR!!!");
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {

        type: String,
        required : true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
    },
    phoneNumber : {
        type : String,
        required : true
        
    },
    password : {
        type : String,
        required : true
    }
})



const userInfo = mongoose.model('userSchema' , userSchema);
module.exports = userInfo;