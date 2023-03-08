import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { getEnquiries } from "../features/enquiry/enquirySlice";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
    // eslint-disable-next-line
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      date: enquiryState[i].createdAt,
      status: (
        <>
          <select name="" id="" className="form-control form-select">
            <option value="">Set Status</option>
          </select>
        </>
      ),

      action: (
        <>
          <Link to="/" className="ms-3 text-danger fs-3">
            <TiDeleteOutline />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Enquiries;
