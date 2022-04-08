import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <div className="my-5">
            <h2>Your Notes</h2>
            <div className="row my-5">
                { notes.map((note) => {
                    return <NoteItem note = {note} key={note._id}/>
                })}
            </div>
        </div>
    )
}
