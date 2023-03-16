import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import './navbar.css';

function Nav() {
    return (
        <div className='header'>
            <div className="left-items">
                <h3 id="header-Homepage">Library Manager</h3>
                <div className="menu-icon">
                    
                </div>
            </div>
            <div className="right-items">
                <Link to="/" id="header-Homepage">Log out</Link>
                <Link to="/Homepage/userInfo" id="header-Homepage">Admin</Link>
            </div>
        </div>  
    );
}

export default Nav;