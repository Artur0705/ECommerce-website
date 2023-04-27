import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = (props) => {
  const { title, brand, totalRating, price, sold, quantity, image, id } = props;
  return (
    <div className="col-4 mb-3">
      <div className="special-product-card">
        <div className="d-flex">
          <div>
            <img
              src={image}
              className="img-fluid  mx-auto "
              alt="product"
              style={{ height: "250px", width: "240px" }}
            />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              count={5}
              size={24}
              value={totalRating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">$ {price}</span> &nbsp;{" "}
              <strike>$ 200</strike>
            </p>
         
            <div className="prod-count my-3">
              <p>Products: {quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: quantity / quantity + sold * 100 + "%" }}
                  aria-valuenow={quantity / quantity + sold * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}
                ></div>
              </div>
            </div>
            <Link className="button" to={`/products/${id}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
