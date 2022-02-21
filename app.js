const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/UsersDB';
const app = express();
const User = require('./models/user');

mongoose.connect(url , {useNewUrlParser:true});
const con = mongoose.connection;
con.on('open' , ()=>{
    console.log('CONNECTED');
})
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users' , userRoutes);

app.listen(3000 , ()=>console.log("Server Started"));