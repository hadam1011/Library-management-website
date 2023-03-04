import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from './navbar';
import SideBar from "./sidebar";
import Content from "./content";
import './home.css';

function Homepage({username}) {
    const [click, setClick] = useState(false);
    let location = useLocation();

    const checkLocation = (location.pathname === "/Homepage/") ? true : false;
    
    return (
        <div className='container'>
            <Nav click={click} setClick={setClick} />
            {click && <SideBar user={username} />}
            {checkLocation && <Content />}
            <Outlet />
        </div>
    );
}

export default Homepage;