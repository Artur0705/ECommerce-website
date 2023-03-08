import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";

const columns = [
  {
    title: "Number",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
    // eslint-disable-next-line
  }, []);
  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const data = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data.push({
      key: i + 1,
      title: blogCategoryState[i].title,
      action: (
        <>
          <Link to="/" className="text-success fs-3">
            <BiEdit />
          </Link>

          <Link to="/" className="ms-3 text-danger fs-3">
            <TiDeleteOutline />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default BlogCategoryList;
