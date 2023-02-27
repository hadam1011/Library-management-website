import './home.css';

function Homepage() {
    return (
        <div className='container'>
            <div className='header'>
                <h3 id="header-left">Library Manager</h3>
                <span>
                    <h3 id="header-Homepage">Log out</h3>
                    <h3 id="header-Homepage">Admin</h3>
                </span>
            </div>
            <div className='sidebar'></div>
            <div className='content'></div>
        </div>
    );
}

export default Homepage;