import React from "react";
import { Link } from "react-router-dom";
import blog1 from "../images/blog-1.jpg";

const BlogCard = (props) => {
  const { id, title, description, date, image } = props;
  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src={image ? image : blog1}
          className="img-fluid w-100"
          alt="blog"
          style={{ height: "300px", width: "300px" }}
        />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: description?.substr(0, 30) + "...",
          }}
        ></p>
        <Link to={"/blog/" + id} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
