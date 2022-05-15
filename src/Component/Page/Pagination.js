import React from "react";
import ReactPaginate from 'react-paginate';

const pagination = (props) => {

    const postNumber = [];
    for (let i = 1; i <= Math.ceil(props.totalPost / props.postsPerPage); i++) {
        postNumber.push(i);
    }

    return (
        <nav>
            <ul className="pagination ">
                {postNumber.map((number, index) => {
                    if (props.maxpageNumberLimit + 1 > number && props.minpageNumberLimit < number) {
                        return (
                            <li className="page-item" key={index + 1}>
                                <input type="text" className="page-link btn-size" onClick={() => props.paginateNumber(number)} value={number}></input>
                            </li>)
                    } else {
                        return null;
                    }
                })}
            </ul>
        </nav>

    )
}
export default pagination; 