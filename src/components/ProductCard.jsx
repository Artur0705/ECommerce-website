import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <div className="col-3">
      <Link to="/" className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link to="/">
            <img src="images/wish.svg" alt="wishlist" />
          </Link>
        </div>
        <div className="product-image">
          <img src="images/watch.jpg" className="img-fluid" alt="product" />
          <img src="images/watch-1.jpeg" className="img-fluid" alt="product" />
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphones bulk 10 multi colored for students
          </h5>
          <ReactStars
            count={5}
            size={24}
            value="4"
            edit={false}
            activeColor="#ffd700"
          />
          <p className="price">$ 100 </p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <Link to={"/"}>
              <img src="images/prodcompare.svg" alt="compare" />
            </Link>
            <Link to={"/"}>
              <img src="images/view.svg" alt="view" />
            </Link>
            <Link to={"/"}>
              <img src="images/add-cart.svg" alt="addcart" />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
