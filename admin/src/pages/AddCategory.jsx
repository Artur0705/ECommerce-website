import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import {
  createProdCategory,
  resetState,
} from "../features/prodCategory/prodCategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newProdCategory = useSelector((state) => state.prodCategory);
  const { isSuccess, isError, isLoading, createdCategory } = newProdCategory;

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!!!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    } // eslint-disable-next-line
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProdCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/category-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category Name"
            name="title"
            onChng={formik.handleChange("title")}
            onBLr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
