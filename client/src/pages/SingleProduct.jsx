import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { IoIosGitCompare } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../features/products/productSlice";
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

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
  }, [dispatch, getProductId]);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadeyAdded(true);
      }
    }
    //eslint-disable-next-line
  }, [cartState, getProductId]);

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
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuQTAUMn4XWRpmEiXZmABDpBvL40ydiMEtlSZrrX1R1kO4fPNbnN_k&usqp=CAE&s",
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
  // const closeModal = () => {};
  return (
    <>
      <Meta title={"Product name"} />
      <BreadCrumb title="Product name" />

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
                  <p className="mb-0 t-review">(2 reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
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
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability :</h3>
                  <p className="product-data">In Stock</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark color-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark color-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark color-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark color-secondary">
                      XXL
                    </span>
                  </div>
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
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {
                        alreadyAdded
                          ? navigate("/cart")
                          : addCart(singleProductState?._id);
                      }}
                    >
                      {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                    </button>
                    {/* <button className="button signup">Buy It Now</button> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <Link to="/compare-product">
                    <IoIosGitCompare className="fs-5 me-2" /> Add to Compare
                  </Link>
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
                  <div>
                    <Link
                      to="/"
                      className="text-dark text-decoration-underline"
                    >
                      Write a review
                    </Link>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
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
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review ">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Artur</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod nam asperiores ipsam deserunt fugiat quae dicta nisi,
                    eveniet, dignissimos eius autem ullam, pariatur praesentium
                    a explicabo nulla eos ratione eum?
                  </p>
                </div>
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
          <ProductCard />
        </div>
      </Container>

      <div
        className="modal fade"
        // id="staticBackdrop"
        // data-bs-backdrop="static"
        // data-bs-keyboard="false"
        // tabIndex="-1"
        // aria-labelledby="staticBackdropLabel"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                {/* <div className="flex-grow-1 w-50">
                  <img
                    src={singleProductState?.images?.[0]?.url}
                    className="img-fluid"
                    alt="product imgae"
                  />
                </div> */}
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            {/* <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div> */}
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                // onClick={() => {
                //   closeModal();
                // }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
