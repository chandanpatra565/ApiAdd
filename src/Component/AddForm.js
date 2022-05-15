import React, { useEffect, useState } from "react";

const AddForm = (props) => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(title.length>1 && setBody.length){

            props.onAdd(title, body);
        }else{
            alert("pleace enter title name and body");
        }
        setTitle("");
        setBody("");

    }

    const setTitle_fn = (e) => {
        setTitle(e.target.value);
    }
    const setBody_fn = (e) => {
        setBody(e.target.value);
    }


    return (
        <>
            <div className="d-flex mt-3 justify-content-center">
                <h3 id="Add_Edit_Text">Add</h3>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={handleOnSubmit}>
                    <input placeholder="title" name="title" onChange={setTitle_fn} value={title} />
                    <input placeholder="Body" name="body" onChange={setBody_fn} value={body} />
                    <button onSubmit={handleOnSubmit} className="Add">Add</button>
                    <hr />
                </form>
            </div>
        </>
    )
}
export default AddForm