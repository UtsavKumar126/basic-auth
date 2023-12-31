import React,{useState} from "react";
import axios from "axios";



const DashBoard=({token})=>{
    const [joke, setJoke] = useState("");



    function getJoke(){
        axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
           headers:{
               "authorization" : `Bearer ${token}`
           }
        })
        .then(response =>{
           console.log("joke", response.data.data.message)
           setJoke(response.data.data.message)
        })
        .catch( err => console.log("Error", err.response.data.message))
   }


    return(
        <div>
            <h1>DashBoard</h1>
            <button onClick={getJoke}>Get Joke</button>
            {
                joke&&<h2>{joke}</h2>
            }
        </div>
    )
}

export default DashBoard