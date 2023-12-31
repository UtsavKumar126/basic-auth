import React, { useState } from "react";
import axios from "axios";



const Signup=({setToken})=>{

    const[user,setUser]=useState({name:"",email:"",password:"",confirmPassword:""})
    const[message,setMessage]=useState("");

    function updateUser(e){
        let key = e.target.name;
        setUser({...user, [key]:e.target.value})
    }
    
    async function implementSignUp(e){

        e.preventDefault();
        
        if(!user.name || !user.email || !user.password || !user.confirmPassword){
            setMessage("Please fill all the fields")
            return;
        }
        if(user.password !== user.confirmPassword){
            setMessage("Password and Confirm Password do not match")
            return;
        }


        try{
            const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
                name:user.name,
                email:user.email,
                password:user.password,
            })

            setMessage(response.data.message)
            setToken(response.data.data.token);
            setUser({name:"",email:"",password:"",confirmPassword:""})
        }
        catch(error){
            console.log(error.response.data.message)
        }
    }
     

    return(
        <div>
            <h1>Signup</h1>
            {
                message&&<h2>{message}</h2>
            }
            <form onSubmit={implementSignUp}>
            <input type="text" placeholder="Name" name="name"
                  onChange={updateUser}
                  value={user.name}
                />
                <br />
                <input type="email" placeholder="Email"  name="email"
                    onChange={updateUser}
                    value={user.email}
                />
                <br />
                <input type="password" placeholder="Password"  name="password"
                    onChange={updateUser}
                    value={user.password}
                />
                <br />
                <input type="password" placeholder="Confirm Password"  name="confirmPassword"
                    onChange={updateUser}
                    value={user.confirmPassword}
                />
                <br />
                <button type="submit">Submit</button> 
            </form>
        </div>
    )
}

export default Signup;



// function updateName(e){
//     setUser({...user, name:e.target.value})    
// }
// function updateEmail(e){
//     setUser({...user, email:e.target.value})
// }
// function updatePassword(e){
//     setUser({...user, password:e.target.value})
// }
// function updateConfirmPassword(e){
//     setUser({...user, confirmPassword:e.target.value})
// }