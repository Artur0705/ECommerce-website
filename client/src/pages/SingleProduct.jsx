import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../features/products/productSlice";
import { addToWishList } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const singleProductState = useSelector(
    (state) => state?.product?.singleProduct
  );
  const productState = useSelector((state) => state?.product?.product);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadeyAdded] = useState(false);
  const cartState = useSelector((state) => state.auth?.cartProducts);
  const [isWishlist, setIsWishlist] = useState(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
    return (
      productState &&
      productState?.reduce((acc, item) => {
        acc[item._id] = wishlistData[item._id] ?? false;
        return acc;
      }, {})
    );
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
    localStorage?.setItem(
      "wishlist",
      JSON.stringify({ ...isWishlist, [id]: false })
    );
  };

  useEffect(() => {
    const wishlistData = JSON.parse(localStorage?.getItem("wishlist")) || {};
    setIsWishlist(
      productState &&
        productState?.reduce((acc, item) => {
          acc[item._id] = wishlistData[item?._id] ?? false;
          return acc;
        }, {})
    );
  }, [productState]);

  const getProductId = location.pathname.split("/")[2];

  useEffect(
    () => {
      dispatch(getAProduct(getProductId));
      dispatch(getUserCart());
      dispatch(getAllProducts());
    },
    //eslint-disable-next-line
    []
  );

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadeyAdded(true);
      }
    }
    //eslint-disable-next-line
  }, []);

  const addCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(
        addProdCart({
          productId: singleProductState?._id,
          quantity,
          color,
          price: singleProductState?.price,
        })
      );
      navigate("/cart");
    }
  };
  const props = {
    width: 400,
    height: 500,
    zoomPosition: "original",
    img: singleProductState?.images?.[0]?.url
      ? singleProductState?.images?.[0]?.url
      : "https://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif",
  };
  // eslint-disable-next-line
  const [orderedProduct, setOrderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      if (element?.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please Choose Stars");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 400);
    }
  };

  return (
    <>
      <Meta title={"Product name"} />
      <BreadCrumb title={singleProductState?.title} />

      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom
                  {...props}
                  className="img-fluid"
                  style={{ height: "240px", width: "240px" }}
                />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {singleProductState?.images?.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      src={item?.url}
                      className="img-fluid mx-auto"
                      alt="productImage"
                      style={{ height: "240px", width: "240px" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{singleProductState?.title} </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {singleProductState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={singleProductState?.totalRating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">
                    ( {singleProductState?.totalRating} Reviews )
                  </p>
                </div>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{singleProductState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{singleProductState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{singleProductState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{singleProductState?.tags}</p>
                </div>
                {alreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Color :</h3>
                      <Color
                        setColor={setColor}
                        colorData={singleProductState?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Quantity :</h3>
                      <div className="">
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={
                      alreadyAdded
                        ? "ms-0"
                        : "ms-5 d-flex align-items-center gap-30 ms-5"
                    }
                  >
                    <button
                      className="button border-0"
                      type="button"
                      onClick={() => {
                        alreadyAdded
                          ? navigate("/cart")
                          : addCart(singleProductState?._id);
                      }}
                    >
                      {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <button
                    className="border-0 bg-transparent wish-btn"
                    onClick={() => {
                      if (isWishlist && isWishlist?.[singleProductState?._id]) {
                        removeFromWish?.(singleProductState?._id);
                      } else {
                        addToWish?.(singleProductState?._id);
                      }
                    }}
                  >
                    {isWishlist && isWishlist?.[singleProductState?._id] ? (
                      <AiFillHeart className="fs-6 text-danger me-2" />
                    ) : (
                      <AiOutlineHeart className="fs-6 me-2" />
                    )}
                    Add To Wishlist
                  </button>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping And Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship to all Aus domestic orders within
                    <b> 5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link :</h3>

                  <button
                    className="copy-btn"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Copy Product Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                className="bg-white p-3"
                dangerouslySetInnerHTML={{
                  __html: singleProductState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container id="review" class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3>Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div className="text-dark text-decoration-underline">
                    Write a review
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a review</h4>

                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={0}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  />
                </div>

                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    className="button border-0"
                    type="button"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {singleProductState &&
                  singleProductState?.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review ">
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">
                            {item?.postedby?.firstName +
                              " " +
                              item?.postedby?.lastName}
                          </h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
