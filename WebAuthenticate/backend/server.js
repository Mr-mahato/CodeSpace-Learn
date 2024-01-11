const express = require('express')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000
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
  loggedVale.forEach((val,ind , arr)=>{
    if(val.email ==checkedValue.email && val.password == checkedValue.password)
    {
      flag =1;
     res.send({message:'logged in successfully'});
    }
  })
  if(flag==0)
  res.send({message:'Users not verified'});
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