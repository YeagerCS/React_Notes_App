import { useState } from "react"
import AlertWindow from "../AlertWindow"
import { Link } from "react-router-dom"

export function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [key, setKey] = useState(0)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    async function handleLogin(e){
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
          const response = await fetch("http://localhost:5000/login", options)
          const data = await response.json()
          console.log(data);
          if(data.token){
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.username)
            setSuccess(true)
          } else{
            setError(data.message)
          }
          setUsername("")
          setPassword("")
          setKey(e => e + 1)
        } catch(error){
          console.log(error);
        }
      }

    return(
        <>
          <div className="loginDiv">
            {error != null && <AlertWindow message={error} closeAlert={() => setError(null)}/>}
            {success && <AlertWindow message="Successfully logged in" closeAlert={() => setSuccess(false)}/>}
            <form className="form">
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} className="boxStyle"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="boxStyle"/>
                <button onClick={handleLogin} className="btnStyle">Login</button>
                <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                <Link to="/">Back to home</Link>
            </form>
          </div>
        </>
    )
}