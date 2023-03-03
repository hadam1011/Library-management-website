// import { Switch } from "react-router-dom";
import { useState } from "react";
import Nav from './navbar';
import SideBar from "./sidebar";
import './home.css';

function Homepage({username}) {
    const [click, setClick] = useState(false);

    return (
        <div className='container'>
            <Nav click={click} setClick={setClick} />
            {click && <SideBar user={username} />}
            <div className='content'></div>
        </div>
    );
}

export default Homepage;