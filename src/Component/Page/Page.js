import React from "react";

const pages = (props) => {

    return (
        <>
            {props.pagedata.map((ele, index) => {
                return (

                    <div className="d-flex mt-3 justify-content-center align-items-center flex-column" key={ele.id}>
                        <h5 className="text">Title:{ele.title}</h5>
                        <p className="text">Body:{ele.body}</p>
                        <div className="d-flex mt-3 justify-content-center align-items-center">
                            <input type="button" value="edit" onClick={() => props.Edit(ele.id, ele.userId)}></input>
                            <input type="button" value="Del" onClick={() => props.Del(ele.id)}></input>
                        </div>
                    </div>
                )
            })

            }
        </>


    )

}
export default pages;