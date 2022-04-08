import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "624efdb31266339ab5397b77",
            "user": "624c98e44291ea075d9fb6cb",
            "title": "Get Set Go",
            "description": "Be Ready",
            "tags": "Personal",
            "date": "2022-04-07T15:05:23.501Z",
            "__v": 0
        },
        {
            "_id": "625014de97a02906040d1b07",
            "user": "624c98e44291ea075d9fb6cb",
            "title": "Code",
            "description": "Open Laptop",
            "tags": "Work",
            "date": "2022-04-08T10:56:30.323Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;