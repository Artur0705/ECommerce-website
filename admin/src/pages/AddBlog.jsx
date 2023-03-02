import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper } from "react-form-stepper";

const AddBlog = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };

  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Images" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />

      <div className="">
        <form action="">
          <CustomInput type="text" label="Enter Blog Title" />
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Blog Category</option>
          </select>
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(e) => {
              handleDesc(e);
            }}
          />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
