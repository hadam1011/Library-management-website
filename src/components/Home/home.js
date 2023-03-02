import { Link } from "react-router-dom";
import './home.css';

function Homepage() {
    return (
        <div className='container'>
            <div className='header'>
                <div className="left-items">
                    <h3 id="header-Homepage">Library Manager</h3>
                </div>
                <div className="right-items">
                    <Link to="/" id="header-Homepage">Log out</Link>
                    <Link to="/userInfo" id="header-Homepage">Admin</Link>
                </div>
            </div>
            <div className='sidebar'></div>
            <div className='content'></div>
        </div>
    );
}

export default Homepage;