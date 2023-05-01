import { useState } from "react";
import { Note } from "./Note";

export function NoteList({ notes, handleDeleteNote, handleEditSelection, editingNoteId }){
    const [search, setSearch] = useState("")
    const [searchedNotes, setSearchedNotes] = useState([])
    const [sorted, setSorted] = useState(false)

    function handleSearch(e){
        e.preventDefault()
        if(search){
            const filtered = notes.filter(note => 
                note.title.toLowerCase().includes(search.toLowerCase())
            );
            setSearchedNotes(filtered)
        } else{
            setSearchedNotes([])
        }
    }

    function resetSearch(e){
        e.preventDefault()
        setSearch("")
        setSearchedNotes([])
    }

    function sortNotes(){
        setSorted(!sorted)
        if(!sorted){
            notes = notes.sort((x, y) => 
                new Date(x.date) - new Date(y.date)
            );
        } else{
            notes = notes.sort((x, y) => 
                x.id - y.id
            );
        }
        
    }


    return(
        <>  
            <ul>
                <input type="text" name="search" id="search" className="boxStyle" placeholder="Search..." value={search} onChange={e => {setSearch(e.target.value); handleSearch(e)}}/> 
                <em><button className="btnStyle" id="searchbtn" onClick={resetSearch}>Reset</button></em>
                 <em><button className="btnStyle" id="searchbtn" onClick={sortNotes}>{sorted ? "Revert" : "Sort"}</button></em>
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