const express = require('express')
const app = express();
const fs = require('fs');

// body-parser is required to take input from body or from some form input
const bodyParser = require('body-parser');
const port = 3000

// we are using cors so that any request being made to our server hit its endpoint
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/login',(req,res)=>{
  var checkedValue = req.body;
  fs.readFile('Users.json','utf-8',(err,data)=>{
    if(err)
    {
      console.log(err);
      res.status(400).send(`Error occured during fetching data`);
    }
  var  loggedVale = data;
  var flag=  0;
  loggedVale = JSON.parse(loggedVale);

  var ind = loggedVale.findIndex(val => val.email == checkedValue.email && val.password == checkedValue.password);
  
  if(ind == -1)
  {
    res.send({message:"Users not verified"});
  }
  else 
  {
    res.send({message:"logged in successfully"});
  }

  })
})
app.post('/register',(req,res)=>{
    var userDetails = req.body;
    console.log(userDetails);
   fs.readFile('Users.json','utf-8',(err,data)=>{
    if(err)
    {
      res.status(400).send(`Error occur during reading file`);
    }
    var retriveData = data;
    console.log(Array.isArray(retriveData))
    retriveData = JSON.parse(retriveData);
    retriveData.push(userDetails);
    var newData = JSON.stringify(retriveData);
    fs.writeFile('Users.json',newData,'utf-8',(err)=>{
      if(err)
      {
        res.status(400).send(`Error found`);
      }
      else 
      {
       res.json({message:"Account created successfully"});
      }
    })
   })
})

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})