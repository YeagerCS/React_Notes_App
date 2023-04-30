import { useEffect, useState } from "react"
import AlertWindow from "./AlertWindow";

export function NoteForm({ handleAddNote, handleEditNote, editNote, loggedIn }){
    const [newTitle, setNewTitle] = useState("")
    const [newContent, setNewContent] = useState("")
    
    const [displayAlert, setDisplayAlert] = useState(false); // New state variable

    useEffect(() =>{
        if(editNote){
            setNewTitle(editNote.title)
            setNewContent(editNote.content)
        }
    }, [editNote])

    function handleNote(e){
        e.preventDefault();
        document.getElementsByTagName("title")[0].innerText = newTitle;

        if(loggedIn){
            if(editNote) {
                handleEditNote(editNote.id, newTitle, newContent)
            } else{
                handleAddNote(newTitle, newContent)
            }
        } else {
            setDisplayAlert(true); // Display the alert window
        }

        setNewContent("")
        setNewTitle("")
    }

    function clearForm(e){
        if(!editNote){
            e.preventDefault()

            setNewContent("")
            setNewTitle("")
        }
        
    }

    return(
        <form className="newNoteForm">
            {displayAlert && <AlertWindow closeAlert={() => setDisplayAlert(false)} message="You need to be logged in to perform this action."/>} {/* Render the alert window */}
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" className="boxStyle" value={newTitle} onChange={e => setNewTitle(e.target.value)}/>
            <label htmlFor="content">Content</label>
            <textarea name="content" id="content" className="boxStyle" value={newContent} onChange={e => setNewContent(e.target.value)}></textarea>
            <div className="btnDiv">
            <button className="btnStyle" onClick={handleNote}>{editNote ? "Save Note" : "Add Note"}</button>
            <button className="btnStyle" onClick={clearForm}>{editNote ? "Cancel" : "Clear"}</button>
            </div>
        </form>
    )
}
