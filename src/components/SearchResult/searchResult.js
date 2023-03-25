import { useState, useEffect } from "react";
import { Input, Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Remain",
    dataIndex: "remain",
    key: "remain",
  },
];

function SearchResult() {
  const [bookList, setBookList] = useState([]);
  const [searchBookList, setSearchBookList] = useState([]);
  const { Search } = Input;

  async function fetchData() {
    await fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((list) => {
        setBookList(list);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onSearch = (value) => {
    const newBookList = [];
    bookList.forEach((book) => {
      if (book.name.toLowerCase().includes(value)) {
        newBookList.push(book);
      }
    });
    setSearchBookList(newBookList);
  };

  return (
    <>
      <Search
        placeholder="Search by book's name"
        allowClear
        onSearch={(value) => onSearch(value)}
        enterButton
        style={{ width: "30%", marginBottom: "10px" }}
      />
      <Table
        columns={columns}
        dataSource={searchBookList}
        bordered
        pagination={{}}
      ></Table>
    </>
  );
}

export default SearchResult;
