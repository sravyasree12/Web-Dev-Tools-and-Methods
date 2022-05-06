import AddNote from './AddNote';
import { useState } from 'react';
import { deleteNote } from './services';
import './App.css';

const Notes = function ({ notes, setUserState }) {

    const [add, setAdd] = useState(false);

    const onClick = function () {
        setAdd(true);
    }

    const handleDelete = function (event) {
        const title = event.target.dataset.index;
        setUserState({
            isLoggedIn: true,
            isPending: true,
        })
        for (let note in notes) {
            if (notes[note].title === title) {
                deleteNote(title)
                    .then(userinfo => {
                        setUserState({
                            isLoggedIn: true,
                            isPending: false,
                            info: userinfo,
                        });

                    })
                    .catch(() => {
                        setUserState({
                            isLoggedIn: true,
                            isPending: false,
                        })
                    })
            }
        }
    }

    if (Object.keys(notes)[1]){
        return (
            <div className="notes-contents">
                <h2>Notes</h2>
                {!add && <button onClick={onClick} id="note-write-btn">Write a Note</button>}
                {add && <AddNote setAdd={setAdd} setUserState={setUserState} add={add} />}
                <ul id="note-ul">
                    {!add && Object.keys(notes).slice(1).map(note => {
                        return (
                            <li>
                                <a href="#">
                                    <div key={notes[note].id} id="note-box">
                                        <button id="note-delete" onClick={handleDelete} data-index={notes[note].title}>X</button>
                                        <div ><span className="note" id="title-id"> {notes[note].title} | Sev{notes[note].priority || 0}</span></div>
                                        <div id="descr-text"><p id="descr" className="note">{notes[note].descr}</p></div> 
                                    </div>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    } else {
        return (
            <>
                <div id="no-note">No Notes on this account board!</div>
                <button onClick={onClick} id="no-note-write-btn">Write a Note</button>
                {add && <AddNote setAdd={setAdd} setUserState={setUserState} add={add} />}

            </>
        )
    }
    
};
export default Notes;