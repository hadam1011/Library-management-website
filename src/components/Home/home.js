import { Switch } from "react-router-dom";
import { useState } from "react";
import Nav from './navbar';
import './home.css';

function Homepage() {
    const [click, setClick] = useState(false);

    return (
        <div className='container'>
            <Nav click={click} setClick={setClick}/>
            <div className='sidebar'></div>
            <div className='content'></div>
        </div>
    );
}

export default Homepage;