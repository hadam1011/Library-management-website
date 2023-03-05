import { useState, useEffect } from 'react';
import './content.css';

function Content() {
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/books')
          .then(res => res.json())
          .then(list => {
            setBookList(list);
          }) 
    }, [])
    
    return (
        <div className="content">   
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Remain</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
}

export default Content;