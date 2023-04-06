import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { getOrders } from "../features/auth/authSlice";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    // eslint-disable-next-line
  }, []);
  const orderState = useSelector((state) => state.auth.orders);

  const data = [];
  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      name:
        orderState[i].orderedBy.firstName +
        " " +
        orderState[i].orderedBy.lastName,
      product: (
        <Link to={`/admin/orders/${orderState[i].orderedBy._id}`}>
          View User Order
        </Link>
      ),
      amount: orderState[i].paymentIntent.amount,
      status: orderState[i].paymentIntent.status,
      date: new Date(orderState[i].paymentIntent.created).toLocaleString(),
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
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;