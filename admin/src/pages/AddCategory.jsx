import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import {
  createProdCategory,
  getAProductCategory,
  resetState,
  updateProductCaetgory,
} from "../features/prodCategory/prodCategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProdCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newProdCategory = useSelector((state) => state.prodCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProdCategory,
    categoryName,
    updatedProdCategory,
  } = newProdCategory;

  useEffect(() => {
    if (isSuccess && createdProdCategory) {
      toast.success("Category Added Successfully!!!");
    }
    if (isSuccess && updatedProdCategory) {
      toast.success("Product Category Updated Successfullly!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    } // eslint-disable-next-line
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getProdCatId !== undefined) {
      dispatch(getAProductCategory(getProdCatId));
    } else {
      dispatch(resetState());
    } // eslint-disable-next-line
  }, [getProdCatId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProdCatId !== undefined) {
        const data = { id: getProdCatId, prodCatData: values };

        dispatch(updateProductCaetgory(data));
        dispatch(resetState());
      } else {
        dispatch(createProdCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/category-list");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getProdCatId !== undefined ? "Edit" : "Add"} Category
      </h3>{" "}
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
            {getProdCatId !== undefined ? "Update" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
