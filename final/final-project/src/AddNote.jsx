import React, { useState } from 'react'
import { addNoteToUsersList } from './services';

export default function AddNote({ setAdd, setUserState, add}){

    const [form, setForm] = useState({
        titleName: "",
        priority: "",
        textDescr: "",
    });

    const updateForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        const title = form.titleName;
        const priority = form.priority;
        const descr = form.textDescr;

        addNoteToUsersList({ title, priority, descr })
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

    const handleOnClick = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleBack = function (){
        setAdd(false);
    }

    return (
        <div className="add-form">
            <form className="add-note-form" onSubmit={handleSubmit}>
                <div id="add-title">
                    <input id="title-name" placeholder="Enter Title" type="text" name="titleName" onChange={updateForm} value={form.titleName} required="required" />
                </div>
                <div id="note-priority">
                    <label >Priority:</label>
                    <div className="dropdown">
                        <select onChange={handleOnClick} name="priority" required="required">
                            <option value="0">--Select--</option>
                            <option value="1" id="very-high">Sev 1: Very High</option>
                            <option value="2" id="high">Sev 2: High</option>
                            <option value="3" id="medium">Sev 3: Medium</option>
                            <option value="4" id="low">Sev 4: Low</option>
                            <option value="5" id="very-low">Sev 5: Very Low</option>
                        </select>
                    </div>
                </div>
                <div>
                    <textarea placeholder="Write description" id="descr-input" type="text" name="textDescr" onChange={updateForm} value={form.textDescr} required="required"></textarea>
                </div>
                <button className="add-note-button" type="submit">Add Note</button>  {add && <button id="back" onClick={handleBack}>Back</button>}
            </form>
        </div>
    )
}