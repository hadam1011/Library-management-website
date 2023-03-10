import { Table} from 'antd'
import './content.css';


function Content({ bookList }) {
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
        }
    ]

    return (
        <>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                      <p
                        style={{
                          margin: 0,
                        }}
                      >
                        {record.description}
                      </p>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
                dataSource={bookList}
            />
        </>
    );
}

export default Content;