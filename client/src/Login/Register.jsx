import { useState } from "react"
import AlertWindow from "../AlertWindow"
import { Link } from "react-router-dom"

export function Register(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [key, setKey] = useState(0)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    async function handleRegister(e){
        e.preventDefault()
        const options = {
          method: 'POST',
          headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }, 
          body: JSON.stringify({
            username: username,
            password: password
          })
        }
    
        try{
          const response = await fetch("http://localhost:5000/register", options)
          const data = await response.json()
          console.log(data);
          if(data.token){
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.username)
            setSuccess(true)
          } else{
            setError(data.message)
          }
          setKey(e => e + 1)
          setUsername("")
          setPassword("")
        } catch(error){
          console.log(error);
        }
    }

    return(
        <>
          <div className="loginDiv">
            {error != null && <AlertWindow message={error} closeAlert={() => setError(null)}/>}
            {success && <AlertWindow message="Successfully Registered" closeAlert={() => setSuccess(false)}/>}
            <form className="form">
                <h1>Register</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} className="boxStyle"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="boxStyle"/>
                <button onClick={handleRegister} className="btnStyle">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <Link to="/">Back to home</Link>
            </form>
          </div>
        </>
    )
}