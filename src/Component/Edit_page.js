import React, { useState } from "react";

const Edit_page = (props) => {
    const [update_title, setupdate_title] = useState();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        props.onUp(e.target.title.value, e.target.body.value, props.Id);
        e.target.title.value = "";
        e.target.body.value = "";
    }
    const cancel = () => {
        document.getElementById("update").style.display = "none";
    }

    return (
        <>
            <div className="container" id="update">
                <div className="d-flex mt-3 justify-content-center">
                    <h3 id="Add_Edit_Text">Update</h3>
                </div>
                <form className="d-flex mt-3 justify-content-center flex-column" onSubmit={handleOnSubmit}>
                    <input placeholder="title" name="title" defaultValue="" />
                    <input placeholder="Body" name="body" className="mt-2" defaultValue="" />
                    <button onSubmit={handleOnSubmit} className="mt-2">Add</button>
                    <button className="mt-2" onClick={cancel}>cancel</button>
                    <hr />
                </form>
            </div>

        </>
    )
}
export default Edit_page;