import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";

export const SingleBlog = () => {
  return (
    <>
      <Meta title={"Single Blog"} />
      <BreadCrumb title="Single Blog" />
      <div className="bolog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-tems-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" />
                  Go back to Blogs
                </Link>
                <h3 className="title">
                  A beautiful sunday morning renaissance
                </h3>
                <img
                  src="/images/blog-1.jpg"
                  className="img-fluid  my-4"
                  alt="blog"
                />
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas sapiente ipsam animi expedita? Provident consectetur
                  officiis fugiat facilis cupiditate architecto quasi minus
                  exercitationem rem! Tempore veritatis eaque quisquam incidunt
                  nemo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
