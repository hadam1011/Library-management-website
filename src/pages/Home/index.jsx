import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from '../../components/Home/navbar';
import SideBar from "../../components/Home/sidebar";
import Content from "../../components/Home/content";
import './home.css';

function HomePage({username}) {
    const [click, setClick] = useState(false);
    let location = useLocation();

    const moveRight = document.querySelector(':root');
    const checkLocation = (location.pathname === "/home-page") ? true : false;

    if (click) {
        moveRight.style.setProperty('--moveRight', '14.5em');
    } else {
        moveRight.style.setProperty('--moveRight', '7.5em');
    }
    
    return (
        <div className='home-container'>
            <Nav click={click} setClick={setClick} />
            {click && <SideBar user={username} />}
            <div className="home-container-content">
                {checkLocation && <Content />}
                <Outlet />
            </div>
        </div>
    );
}

export default HomePage;