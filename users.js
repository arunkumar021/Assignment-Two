import bcrypt from 'bcrypt';

   var users = [];
   

   export const login =  async (req , res) => {
    const user = users.find((user) =>user.name === req.body.name);
   if(user == null) {
    return res.status(400).send("Cannot find user");
    }
    try {
    if(await bcrypt.compare(req.body.password , user.password)) {
        res.send('Success');
        return true;
    } else {
        res.send('Not Allowed');
    }
   }catch{
    res.status(500).send();
  }
   };


   export const createUser = async (req , res)=>{
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password , 10)
        // console.log(salt);
        // console.log(hashPassword);
   const user = {name : req.body.name , password : hashedPassword };
   console.log(user);
   users.push(user);
   res.send(`User created in the database`);
    }catch{
        res.status(500).send();
    }
};

  
export const getUserWithId = (req , res) =>{
    let result = login();
    if(result === true) {
    const { id } = req.params;
    if((users.some((user) => id === user.id)) === false) {
        res.status(400).send("Invalid ID!");               //Bad Request
    }
    else {
        const foundUser = users.find((user)=> id === user.id);
        res.send(`FirstName : ${foundUser.firstName}
                  LastName : ${foundUser.lastName}
                  Age : ${foundUser.age}
                  ID : ${id}
        `);
    }
    res.send(users);
}
}

export const deleteUser =  (req , res) => {
    if((users.some((user) => id === user.id)) === false) {
        res.status(400).send("Invalid ID!");
    }
    else {
    users = users.filter((user) => id !== user.id);
    res.send(`User with the id ${id} deleted from the database`);
    }
};

export const updateUserInfo = (req , res) => {
    const {id} = req.params;

    if((users.some((user) => id === user.id)) === false) {
        res.status(400).send("Invalid ID!");
    }

    else {
    const {firstName , lastName , age} = req.body;

    const user = users.find((user)=> user.id === id);

    if(firstName) {
        user.firstName = firstName;
    }
    if(lastName) {
        user.lastName = lastName;
    }
    if(age) {
        user.age = age;
    }
    res.send(`user with the id  ${id} has been updated `)
  }
}
