import { useState, useEffect } from "react";
import { Input, Table, Tag, Row, Col, Space } from "antd";

const url = "http://localhost:3000/books";

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
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagList, setTagList] = useState([]);
  const { Search } = Input;
  const { CheckableTag } = Tag;

  async function fetchData() {
    await fetch(url)
      .then((res) => res.json())
      .then((list) => {
        setBookList(list);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let tagsData = [];
    bookList.forEach((book) => {
      const tags = book.category.split(" - ");
      tags.forEach((tag) => {
        if (!tagsData.includes(tag)) {
          tagsData.push(tag);
        }
      });
    });
    window.localStorage.setItem("tagData", JSON.stringify(tagsData));
    setTagList(JSON.parse(window.localStorage.getItem("tagData")));
  }, [bookList]);

  const onSearch = (value) => {
    const newBookList = [];
    if (value === "" && selectedTags.length === 0) {
      setSearchBookList(bookList);
    } else if (value === "" && selectedTags.length !== 0) {
      bookList.forEach((book) => {
        const bookCategory = book.category.split(" - ");
        bookCategory.forEach(category => {
          if (selectedTags.includes(category)) {
            newBookList.push(book);
          }
        })
      });
      setSearchBookList(newBookList);
    } else {
      bookList.forEach((book) => {
        const bookCategory = book.category.split(" - ");
        bookCategory.forEach(category => {
          if (book.name.toLowerCase().includes(value) && selectedTags.includes(category)) {
            newBookList.push(book);
          }
        })
      });
      setSearchBookList(newBookList);
    }
  };

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <>
      <Row>
        <Col span={6}>
          <Search
            placeholder="Enter book's name here"
            allowClear
            onSearch={(value) => onSearch(value)}
            enterButton
            style={{ marginBottom: "10px", paddingRight: "10px" }}
          />
        </Col>
        <Col span={17}>
          <span>Category: </span>
          <Space size={[0, 8]} wrap>
            {
              tagList.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={searchBookList}
        bordered
        pagination={{
          hideOnSinglePage: true,
        }}
      ></Table>
    </>
  );
}

export default SearchResult;
