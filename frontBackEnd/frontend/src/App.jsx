import  { useEffect, useState } from 'react'
import axios from 'axios'
const styl= {
  color:'white',
  backgroundColor:'green',
  margin:'2',
  display:'flex',
}
function App() {
  const [jokes , setJokex] = useState([])
 
  useEffect(() => {
    axios.get('/api/getData')
    .then((res) => {
    setJokex(res.data) 
    })
    .catch((err)=>{
      console.log('i am inside the error block')
      console.log(err);
    })
})
  return (
  <>
    <h1 style={styl}>This is the fronEnd and backEnd integrated app</h1>
  {
    jokes.map((joke) => {
      return (
        <div style={styl} key = {joke.id}>
        <h3>Id: {joke.id}</h3>
        <h4>Name: {joke.name}</h4>
        <p >Content: {joke.content}</p>
        </div>
      )
    })
  }

 
  <h2>{jokes.length}</h2>
  </>
  )
}

export default App
