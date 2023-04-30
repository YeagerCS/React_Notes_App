import { Home } from "./Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "./styles.css"
import { Register } from "./Login/Register"
import { Login } from "./Login/Login"


export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}