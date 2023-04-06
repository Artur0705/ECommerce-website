import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { getOrderByUser } from "../features/auth/authSlice";

const columns = [
  {
    title: "Number",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
    // eslint-disable-next-line
  }, []);
  const orderState = useSelector((state) => state.auth.orderByUser.products);
  console.log(orderState);
  const data = [];
  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      name: orderState[i].product.title,
      brand: orderState[i].product.brand,
      category: orderState[i].product.category,
      amount: orderState[i].product.price,
      color: orderState[i].product.color,
      date: new Date(orderState[i].product.createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">View Order</h3>
      <div>{<Table columns={columns} dataSource={data} />}</div>
    </div>
  );
};

export default ViewOrder;
