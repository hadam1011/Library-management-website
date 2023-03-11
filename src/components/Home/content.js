import { Table } from 'antd'
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons'
import './content.css';

function Content() {
  const [bookList, setBookList] = useState([])

  // call API to get book list
  async function fetchData() {
    await fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(list => {
        setBookList(list);
      }) 
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  function handleDelete(id) {
    var options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    };

    async function fetchDelete() {
      await fetch('http://localhost:3000/books' + '/' + id, options)
        .then((res) => res.json())
        .then(() => {
          fetchData();
        })
    }
    fetchDelete();
  }

  const columns = [
      {
          title: 'Name',
          dataIndex: 'name'
      },
      {
          title: 'Author',
          dataIndex: 'author'
      },
      {
          title: 'Category',
          dataIndex: 'category'
      },
      {
          title: 'Remain',
          dataIndex: 'remain'
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (record) => <DeleteOutlined style={{fontSize:'20px'}} onClick={() => handleDelete(record.id)} />
      },
    ]

    return (
      <Table
          columns={columns}
          expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
          dataSource={bookList}
      />
    );
}

export default Content;