import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { getCategories } from "../features/prodCategory/prodCategorySlice";

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

const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  const prodCategoryState = useSelector(
    (state) => state.prodCategory.prodCategories
  );

  const data = [];
  for (let i = 0; i < prodCategoryState.length; i++) {
    data.push({
      key: i + 1,
      title: prodCategoryState[i].title,
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
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default CategoryList;
