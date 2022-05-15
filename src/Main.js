import App from "./App";
import { Routes, Route } from "react-router-dom";

const Main=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<App></App>}></Route>
        </Routes>
        </>
    )
}
export default Main;