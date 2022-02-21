const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');


  const login = async(req , res)=> {
    users = await User.find();
    const user = users.find((user) =>user.username === req.body.username);
   if(user == null) {
    return res.status(400).send("Cannot find user");
    }
    try {
    if(await bcrypt.compare(req.body.password , user.password)) {
        res.send('Success');
    } else {
        res.send('Not Allowed');
    }
   }catch{
    res.status(500).send();
  }
}

 const getUsers = async(req , res) => {
    try {
         users = await User.find();
        res.json(users);
    }catch(err) {
        res.send('ERROR '+ err);
    }
};

 const createUser = async(req , res)=> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password , 10)
    const user = new User({
        username:req.body.username,
        password:hashedPassword,
        name:req.body.name,
        age:req.body.age,
        id:req.body._id
    })
    console.log(user);
    try{
    const a1 = await user.save();
    res.json(a1);
}catch(err) {
    res.send('ERROR');
}
}

 const getUserWithId = async (req , res) =>{
    
    const { id } = req.params;
    try{
        const users = await User.findById(id);
        res.json(users);
    }catch(err) {
        res.status(400).send("Invalid ID");
    }
     
    //  users = await User.find();
    // const { id } = req.params;
    // if((users.some((user) => id === user.id)) === false) {
    //     res.status(400).send("Invalid ID!");               //Bad Request
    // }
    // else {
    //     const foundUser = users.find((user)=> id === user.id);
    //     res.send(foundUser);
    // }
    // res.send(users);
}

 const updateUser = async (req , res) => {
    const {id} = req.params;
    const {name , age , id1} = req.body;
    try {
     const user = await User.findById(id);
     console.log(age);
     if(name) {
         user.name = name;
     }
     if(age) {
         user.age = age;
     }
     if(id) {
         user.id = id1;
     }
     const a1 = await user.save();
     res.send(`user with ${id} has been updated`)
    } catch(err) {
        res.status(400).send("Invalid ID!");
    }
//     if((users.some((user) => id === user.id)) === false) {
//         res.status(400).send("Invalid ID!");
//     }
    
   
//     else if(users.find((user)=> user.id === id)) {
//     const {firstName , lastName , age} = req.body;

//     if(firstName) {
//         user.firstName = firstName;
//     }
//     if(lastName) {
//         user.lastName = lastName;
//     }
//     if(age) {
//         user.age = age;
//     }
//     res.send(`user with the id  ${id} has been updated `)
//   }
 }

 const deleteUser = async(req , res) => {

    const { id } = req.params;
    const users = await User.find(id);
   if((users.some((user) => id === user.id)) === false) {
       res.status(400).send("Invalid ID!");
   }
   else  {  //if(users.((user) => id !== user.id))
       const user = users.find((user) => id === user.id);
       console.log(user);
       let ind = users.indexOf(user);
       users.splice(ind , 1);
   res.send(`User with the id ${id} deleted from the database`);
   }
};



 module.exports = {login , getUsers , createUser , getUserWithId , deleteUser , updateUser};