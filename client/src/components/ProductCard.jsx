import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishList } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isWishlist, setIsWishlist] = useState(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
    return data?.reduce((acc, item) => {
      acc[item?._id] = wishlistData[item?._id] ?? false;
      return acc;
    }, {});
  });

  const addToWish = (id) => {
    dispatch(addToWishList(id));
    setIsWishlist({ ...isWishlist, [id]: true });
    toast.success("Product Added To Wishlist");
    localStorage.setItem(
      "wishlist",
      JSON.stringify({ ...isWishlist, [id]: true })
    );
  };

  const removeFromWish = (id) => {
    dispatch(addToWishList(id));
    setIsWishlist({ ...isWishlist, [id]: false });
    toast.info("The Product Has Been Removed From Wishlist");
    localStorage.setItem(
      "wishlist",
      JSON.stringify({ ...isWishlist, [id]: false })
    );
  };

  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
    setIsWishlist(
      data?.reduce((acc, item) => {
        acc[item?._id] = wishlistData[item?._id] ?? false;
        return acc;
      }, {})
    );
  }, [data]);

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/products" ? `gr-${grid}` : "col-3"
            }`}
          >
            <div className="product-card position-relative mb-5">
              <div className="wishlist-icon position-absolute">
                <button
                  className="border-0 bg-transparent"
                  onClick={() => {
                    if (isWishlist[item._id]) {
                      removeFromWish(item._id);
                    } else {
                      addToWish(item._id);
                    }
                  }}
                >
                  {isWishlist[item._id] ? (
                    <AiFillHeart className="fs-6 text-danger" />
                  ) : (
                    <AiOutlineHeart className="fs-6 " />
                  )}
                </button>
              </div>
              <div className="product-image d-flex align-items-center justify-content-center">
                <img
                  src={item?.images[0]?.url}
                  className="img-fluid  mx-auto "
                  alt="product"
                  style={{ height: "240px", width: "240px" }}
                />
                <img
                  src={item?.images[1]?.url}
                  className="img-fluid  mx-auto "
                  alt="product"
                  style={{ height: "240px", width: "240px" }}
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
                    <img
                      onClick={() => navigate(`/products/${item?._id}`)}
                      src={view}
                      alt="view"
                    />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
