import React, { useState } from "react";
import axios from "axios";



const Login=({setToken})=>{

    const[user,setUser]=useState({email:"",password:""})
    const[message,setMessage]=useState("");

    function updateUser(e){
        let key = e.target.name;
        setUser({...user, [key]:e.target.value})
    }
    
    async function implementLogin(e){

        e.preventDefault();
        if(!user.email || !user.password){
            setMessage("Please fill all the fields")
            return;
        }

        try{
            const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/login",{
                email:user.email,
                password:user.password,
            })

            setMessage(response.data.message)
            setToken(response.data.data.token);
            setUser({email:"",password:""})
        }
        catch(error){
            console.log(error.response.data.message)
        }
    }
     

    return(
        <div>
            <h1>Login</h1>
            {
                message&&<h2>{message}</h2>
            }
            <form onSubmit={implementLogin}>
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
                <button type="submit">Submit</button> 
            </form>
        </div>
    )
}

export default Login;