const express = require('express');
const userInfo = require('./userDB');
const adminInfo = require('./adminDB');
const md5 = require('md5')
const routes = express.Router();

routes.get('/enterUser', (req, res) =>{
    let htmlSend = `
    <form method="post" action="/addUser">
    <input type="text" name="name">
    <input type="text" name="email">
    <input type="text" name="phoneNumber">
    <input type="text" name="password">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/addUser', async (req, res) =>{
    // console.log(req.body);
    
    
    let {name, email, phoneNumber, password} = req.body;

    if(!name || !email || !phoneNumber || !password)
    {
        return res.status(400).send("please enter all the parameters");
    }
    console.log(password)

    password = md5(password);
    
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = email.match(re);
        console.log(validEmail);

        if(!validEmail)
        {
            return res.status(400).send("please enter valid email id");
        }
        email = validEmail[0];
        
        let data = await userInfo.find({email : email});
        console.log("this is data in adding user",data)
        console.log("data value -->>",data[0])
        if(data[0])
        {
            return res.status(400).send("email already exists");
        }


    const userValue = new userInfo({
        name : name,
        email : email,
        phoneNumber : phoneNumber,
        password : password
    })
    let result = await userValue.save();
    result['message'] = "details entered sucessfully";
    return res.status(200).send(result);

})







routes.get('/enterAdmin', (req, res) =>{
    let htmlSend = `
    <form method="post" action="/addAdmin">
    <input type="text" name="name">
    <input type="text" name="email">
    <input type="text" name="password">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/addAdmin', async (req, res) =>{
    // console.log(req.body);
    
    
    let {name, email, password} = req.body;

    if(!name || !email || !password)
    {
        return res.status(400).send("please enter all the parameters");
    }
    
    
    console.log(password);
    password = md5(password);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = email.match(re);
        console.log(validEmail);

        if(!validEmail)
        {
            return res.status(400).send("please enter valid email id");
        }
        email = validEmail[0];
    
    let data = await adminInfo.find({email : email});
    console.log("this is data in adding admin",data)
    console.log("data value -->>",data[0])
    if(data[0])
    {
        return res.status(400).send("email already exists");
    }
    const adminValue = new adminInfo({
        name : name,
        email : email,
        password : password,
    })
    let result = await adminValue.save();
    result['message'] = "details entered sucessfully";
    return res.status(200).send(result);

})











routes.get('/findAdmin', (req, res) =>{
    let htmlSend = `
    <form method="post" action="/readAdmin">
    <input type="text" name="email">
    <input type="text" name="password">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/readAdmin',async  (req, res) =>{
    // console.log(req.body);
    
    
    let {email, password} = req.body;

    if(!email || !password)
    {
        return res.status(400).send("please enter all the parameters");
    }
    

    
    let data = await adminInfo.findOne({ email : email});
    console.log(data);

    if(!data)
    {
        return res.status(400).send("please enter valid credentials");
    }
    let savedPass = data.password;
    console.log(savedPass);
    if(md5(password) != savedPass)
    {
        return res.status(400).send("please enter valid credentialsssssss");
    }

    return res.status(200).send(data);

})


routes.get('/findUser',  (req, res) =>{
    let htmlSend = `
    <form method="post" action="/readUser">
    <input type="text" name="email">
    <input type="text" name="password">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/readUser',async  (req, res) =>{
    // console.log(req.body);
    
    
    let {email, password} = req.body;

    if(!email || !password)
    {
        return res.status(400).send("please enter all the parameters");
    }
    
    let data = await userInfo.findOne({ email : email});
    console.log(data);

    if(!data)
    {
        return res.status(400).send("please enter valid credentials");
    }
    let savedPass = data.password;
    console.log(savedPass);
    if(md5(password) != savedPass)
    {
        return res.status(400).send("please enter valid credentialsssssss");
    }

    return res.status(200).send(data);
})




routes.get('/changeUserPassword',  (req, res) =>{
    let htmlSend = `
    <form method="post" action="/resetUserPassword">
    <input type="text" placeholder="enter email" name="email">
    <input type="text" placeholder="current password" name="password">
    <input type="text" placeholder="New Password" name="newPassword">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/resetUserPassword',async (req, res) =>{
    // console.log(req.body);
    
    
    let {email , password, newPassword} = req.body;

    if(!email || !password || !newPassword)
    {
        return res.status(400).send("please enter password");
    }
    
    let currPassword = md5(password);
    newPassword = md5(newPassword);

    let data = await userInfo.findOne({ email : email});
    console.log(data);

    if(!data)
    {
        return res.status(400).send("please enter valid email to change your current password");
    }
    let savedPass = data.password;
    console.log(savedPass);
    if(currPassword != savedPass)
    {
        return res.status(400).send("please enter valid credentialsssssss to change your password");
    }

    data.password = newPassword;
    await data.save();

    return res.status(200).send("your password has been changed");
    // userInfo.findOneAndUpdate({ password : currPassword},{ password : newPassword},(err,data)=>{
    //     if(err) 
    //     return res.status(400).send("Retry, password already exists");
    //     else
    //     return res.status(200).send(data+"password changed successfully");
    // })
})








routes.get('/changeAdminPassword', (req, res) =>{
    let htmlSend = `
    <form method="post" action="/resetAdminPassword">
    <input type="text" placeholder="enter email" name="email">
    <input type="text" placeholder="Old Password" name="password">
    <input type="text" placeholder="New Password" name="newPassword">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/resetAdminPassword', async (req, res) =>{
    // console.log(req.body);
    
    
    let {email , password, newPassword} = req.body;

    if(!email || !password || !newPassword)
    {
        return res.status(400).send("please enter password");
    }
    
    let currPassword = md5(password);
    newPassword = md5(newPassword);

    let data = await adminInfo.findOne({ email : email});
    console.log(data);

    if(!data)
    {
        return res.status(400).send("please enter valid email to change your current password");
    }
    let savedPass = data.password;
    console.log(savedPass);
    if(currPassword != savedPass)
    {
        return res.status(400).send("please enter valid credentialsssssss to change your password");
    }

    data.password = newPassword;
    await data.save();

    return res.status(200).send("your password has been changed");
})





routes.get('/deleteAdmin', (req, res) =>{
    let htmlSend = `
    <form method="post" action="/deleteAdminAccount">
    <input type="text" placeholder="email" name="email">
    <input type="text" placeholder="password" name="password">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/deleteAdminAccount', async (req, res) =>{
    // console.log(req.body);
    
    
    let {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(400).send("please enter valid credentials");
    }
    
    password = md5(password);
    
    let data = await adminInfo.findOne({ email : email});
    console.log(data);

    if(!data)
    {
        return res.status(400).send("please enter valid email");
    }
    let savedPass = data.password;
    console.log(savedPass);
    if(password != savedPass)
    {
        return res.status(400).send("please enter valid password");
    }

    
    adminInfo.findOneAndDelete({ email : email},(err,data)=>
    {
        if(err) 
        return res.status(400).send("Error");
        else
        return res.status(200).send("Account deleted");
    })
})





routes.get('/deleteUser', (req, res) =>{
    let htmlSend = `
    <form method="post" action="/deleteUserAccount">
    <input type="text" placeholder="email" name="email">
    <input type="text" placeholder="password" name="password">
    <button type="submit">click</button>
</form>`
    res.send(htmlSend);
})


routes.post('/deleteUserAccount', async (req, res) =>{
    // console.log(req.body);
    
    
    let {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(400).send("please enter credentials");
    }
    
    password = md5(password);
    
    let data = await userInfo.findOne({ email : email});
    console.log(data);

    if(!data)
    {
        return res.status(400).send("please enter valid email");
    }
    let savedPass = data.password;
    console.log(savedPass);
    if(password != savedPass)
    {
        return res.status(400).send("please enter valid password");
    }

    
    userInfo.findOneAndDelete({ email : email},(err,data)=>
    {
        if(err) 
        return res.status(400).send("Error");
        else
        return res.status(200).send("Account deleted");
    })
})






module.exports = routes;
