import { useState } from "react";
import { Note } from "./Note";

export function NoteList({ notes, handleDeleteNote, handleEditSelection, editingNoteId }){
    const [search, setSearch] = useState("")
    const [searchedNotes, setSearchedNotes] = useState([])
    async function handleSearch(e){
        e.preventDefault()
        if(search){
            try{
                const response = await fetch("http://localhost:5000/readSearch/" + search)
                const data = await response.json()
                console.log(data);
                setSearchedNotes(data)
            } catch(error){
                console.log(error);
            }
        } else{
            setSearchedNotes([])
        }
    }


    return(
        <>  
            <ul>
                <input type="text" name="search" id="search" className="boxStyle" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}/> 
                <em><button className="btnStyle" id="searchbtn" onClick={handleSearch}>Search</button></em>
                {searchedNotes.length > 0 ? (
                    <>
                        {!searchedNotes ? "Loading...": searchedNotes.map(note =>{
                            return(
                                <Note {...note} key={note.id} handleDeleteNote={handleDeleteNote} handleEditSelection={handleEditSelection} editingNoteId={editingNoteId}/>
                            )
                        })}
                    </>
                ) : (
                    <>
                        {!notes ? "Loading...": notes.map(note =>{
                            return(
                                <Note {...note} key={note.id} handleDeleteNote={handleDeleteNote} handleEditSelection={handleEditSelection} editingNoteId={editingNoteId}/>
                            )
                        })}
                    </>
                )}
                
                {notes.length === 0 && "No notes"}
            </ul>
        </>
    )
}