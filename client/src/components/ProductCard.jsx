import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.jpeg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = (props) => {
  const { grid, data } = props;
  console.log(data);

  const location = useLocation();
  return (
    <>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                location.pathname === "/products" ? `gr-${grid}` : "col-3"
              }`}
            >
              <Link
                to={`${
                  location.pathname === "/"
                    ? "/products/:id"
                    : location.pathname === "/products/:id"
                    ? "/products/:id"
                    : ":id"
                }`}
                className="product-card position-relative"
              >
                <div className="wishlist-icon position-absolute">
                  <button className="border-0 bg-transparent">
                    <img src={wish} alt="wishlist" />
                  </button>
                </div>
                <div className="product-image">
                  <img
                    src={item?.images[0]?.url}
                    className="img-fluid  mx-auto"
                    alt="product"
                    width={300}
                  />
                  <img
                    src={item?.images[1]?.url}
                    className="img-fluid  mx-auto"
                    alt="product"
                    width={300}
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">{item?.brand}</h6>
                  <h5 className="product-title">{item?.title}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item.totalRating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p
                    className={`description ${
                      grid === 12 ? "d-block" : "d-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                  <p className="price">$ {item.price} </p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent">
                      <img src={prodcompare} alt="compare" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src={view} alt="view" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src={addcart} alt="addcart" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
