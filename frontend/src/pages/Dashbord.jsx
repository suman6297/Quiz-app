import React,{useState} from 'react'
import Quiz from './Quiz'

const Dashbord = () => {
const [quize, setquize] = useState(false)

const handleclick=()=>{
  setquize(true)
}


  return (
    <div>
      <br/>

      { quize ? " ": <button onClick={handleclick} className='block m-auto bg-orange-500 py-2 px-6 text-2xl rounded-2xl hover:bg-yellow-400'>
        Start Quiz
      </button>}


      {quize &&
      
       <div>
       <Quiz />

       
       
        </div> 
       
        } 


    </div>
  )
}

export default Dashbord