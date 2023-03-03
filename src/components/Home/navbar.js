import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import './navbar.css';

function Nav({click, setClick}) {
    const handlClick = () => setClick(!click);

    return (
        <div className='header'>
            <div className="left-items">
                <h3 id="header-Homepage">Library Manager</h3>
                <div className="menu-icon" onClick={handlClick}>
                    {click ? <AiOutlineClose /> : <AiOutlineMenu/>}
                </div>
            </div>
            <div className="right-items">
                <Link to="/" id="header-Homepage">Log out</Link>
                <Link to="/userInfo" id="header-Homepage">Admin</Link>
            </div>
        </div>  
    );
}

export default Nav;