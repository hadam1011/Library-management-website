import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from './navbar';
import SideBar from "./sidebar";
import Content from "./content";
import './home.css';

function Homepage({username}) {
    const [click, setClick] = useState(false);
    let location = useLocation();

    const [bookList, setBookList] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/books')
          .then(res => res.json())
          .then(list => {
            setBookList(list);
          }) 
    }, [])

    const moveRight = document.querySelector(':root');
    const checkLocation = (location.pathname === "/Homepage") ? true : false;

    if (click) {
        moveRight.style.setProperty('--moveRight', '14.5em');
    } else {
        moveRight.style.setProperty('--moveRight', '7.5em');
    }
    
    return (
        <div className='home-container'>
            <Nav click={click} setClick={setClick} />
            {click && <SideBar user={username} />}
            <div className="content-container">
                {checkLocation && <Content bookList={bookList} />}
                <Outlet />
            </div>
        </div>
    );
}

export default Homepage;