import './content.css';

function Content({bookList}) {
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
                    {bookList.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.remain}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Content;