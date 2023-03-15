import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper } from "react-form-stepper";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../features/blog/blogSlice";
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog Title is Required"),
  description: Yup.string().required("Blog Description is Required"),
  category: Yup.string().required("Blog Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogCategories());
    // eslint-disable-next-line
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const newBlog = useSelector((state) => state.blog);

  const { isSuccess, isError, isLoading, createdBlog } = newBlog;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!!!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    } // eslint-disable-next-line
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
    // eslint-disable-next-line
  }, [img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/blog-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Images" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onChng={formik.handleChange("title")}
              onBLr={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            val={formik.values.brand}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {blogCategoryState.map((item, j) => {
              return (
                <option key={j} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
            placeholder="Enter Blog Description"
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="showimages d-flex flex-wrap mt-3 gap-3">
              {imgState.map((item, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(deleteImg(item.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "510x", right: "10px" }}
                    ></button>
                    <img
                      src={item.url}
                      alt="productImg"
                      width={200}
                      height={200}
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
