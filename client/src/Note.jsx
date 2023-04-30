import "./App"

export function Note({ id, title, date, handleDeleteNote, handleEditSelection, editingNoteId }){
    function getCurrentDate(stringDate){
        const currentDate = new Date(stringDate)
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
      
        return formattedDate;
    }

    const selectedClass = editingNoteId && editingNoteId == id ? "selected" : ""

    return(
        <li>
            <div>
                <em className={selectedClass}>{title}</em> <em id="date">{getCurrentDate(date)}</em>
                <section>
                    <button className="btnStyleDanger" onClick={() => handleDeleteNote(id)}>Delete</button>
                    <button className="btnStyle" id="editBtn" onClick={() => handleEditSelection(id)}>Edit</button>
                </section>
            </div>
        </li>
    )
}