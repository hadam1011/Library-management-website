import { Link } from 'react-router-dom';
import './sidebar.css';

function SideBar({user}) {
    return (
        <div className="sidebar">
            <ul className="sidebar-options">
                <div className="op-box">
                    <li>
                        <Link to={`/Homepage/${user}`}>Home</Link>
                    </li>
                </div>
                <div className="op-box">
                    <li>
                        <Link to="search">Search</Link>
                    </li>
                </div>
                <div className="op-box">
                    <li>
                        <Link to="book-management">Book Management</Link>
                    </li>
                </div>
                <div className="op-box">
                    <li>
                        <Link to="add-manager">Add Manager</Link>
                    </li>
                </div>
            </ul>
        </div>
    );
}

export default SideBar;