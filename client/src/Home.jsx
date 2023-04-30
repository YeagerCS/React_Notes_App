import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { NoteForm } from "./NoteForm"
import { NoteList } from "./NoteList"
import AlertWindow from "./AlertWindow"

export function Home(){
  const url = "http://localhost:5000"

  const [notes, setNotes] = useState([])
  const [editNote, setEditNote] = useState(null)
  const [loggedIn, setLoggedIn] = useState(() => {
    if(localStorage.getItem("token")){
      return true
    }

    return false
  })
  const [alert, setAlert] = useState(false)


  useEffect(() =>{
    fetch(url + "/readNotes")
    .then(response => response.json()).then(data =>{
      setNotes(data)
    })
  }, [])

  function handleAddNote(title, content){
    fetch(url + "/insertNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: content,
        date: new Date()
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      const currentId = data.id;

      setNotes(currentNotes => {
        return [
          ...currentNotes,
          {id: currentId, title, content, date: new Date()}
        ]
      })

    })
    .catch(error => {
      console.log(error);
    })
    
  }

  function handleDeleteNote(id){
    if(loggedIn){
      fetch(url + "/deleteNotes/" + id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response =>  response.json())
      .then(data =>{
        console.log(data);
        setNotes(currentNotes =>{
          return currentNotes.filter(note => note.id !== id)
        })
      }).catch(error =>{
        console.log(error);
      })
    } else{
      setAlert(true)
    }
  }

  function handleEditSelection(id){
    const note = notes.find(curr => curr.id === id)
    setEditNote(note)
  }

  function handleEditNote(id, title, content){
    fetch(url + "/updateNotes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: content,
        date: new Date()
      })
    }).then(response => response.json())
    .then(data =>{
      setNotes(currentNotes => {
        return (
          currentNotes.map(note => {
            if (note.id === id){
              return {id, title, content, date: new Date()}
            } else{
              return note;
            }
          })
        )
      })
      console.log(data);
    }).catch(error =>{
      console.log(error);
    })

    setEditNote(null)
  }

  function handleLogOut(e){
    e.preventDefault() 
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setLoggedIn(false)
  }

  return (
    <>
      <div id="div">
        <h1>Notes Sneaker</h1>
        {!loggedIn ? (<div><em><Link to="/register">Register</Link></em> <em><Link to="/login">Login</Link></em><br/><br/></div>) : (
          <div><em id="plainText">{localStorage.getItem("user")}</em> <em><a onClick={handleLogOut}>Log out</a></em><br/><br/></div>
        )}
        {alert && <AlertWindow message="You need to be logged in to perform this action" closeAlert={() => setAlert(false)}/>}
        <div className="mainDivider">
          <NoteForm handleAddNote={handleAddNote} handleEditNote={handleEditNote} editNote={editNote} loggedIn={loggedIn}/>
          <NoteList notes={notes} handleDeleteNote={handleDeleteNote} handleEditSelection={handleEditSelection} editingNoteId={editNote ? editNote.id : 0}/>
        </div>
      </div>
    </>
  )
}