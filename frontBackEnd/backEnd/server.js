const express = require('express');
const app = express();

const val = [
    {
        id:1,
        name:"chandu",
        content:'He is good boy'
    },
    {
        id:2,
        name:"kamal",
        content:"He is my bestFriend"
    },
    {
        id:3,
        name:"suresh",
        content:"This is his taxi"
    }
]
const port = 3000;

app.get('/api/getData',(req,res)=>{
    res.send(val);
})

app.get('/',(req,res)=>{
    res.send(`Welcome to the frontend and backend integration part`);
})

app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`);
})