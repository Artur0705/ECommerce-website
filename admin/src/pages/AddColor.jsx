import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import { createColor } from "../features/color/colorSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!!!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    } // eslint-disable-next-line
  }, [isSuccess, isError, isLoading, createColor]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/color-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
            name="title"
            onChng={formik.handleChange("title")}
            onBLr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
