import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import { createBlogCategory } from "../features/blogCategory/blogCategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog Category Name is Required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory } =
    newBlogCategory;

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully!!!");
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
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/blog-category-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            onChng={formik.handleChange("title")}
            onBLr={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogcategory"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
