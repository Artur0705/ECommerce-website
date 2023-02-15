import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { IoIosGitCompare } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";

const SingleProduct = () => {
  const props = {
    width: 400,
    height: 500,
    zoomPosition: "original",
    img: "https://s.yimg.com/os/creatr-uploaded-images/2022-09/858128d0-3491-11ed-aeec-c03b39ac030c",
  };

  const [orderedProduct, setOrderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <>
      <Meta title={"Product name"} />
      <BreadCrumb title="Product name" />

      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img
                  src="https://s.yimg.com/os/creatr-uploaded-images/2022-09/858128d0-3491-11ed-aeec-c03b39ac030c"
                  className="img-fluid"
                  alt="productImage"
                />
              </div>
              <div>
                <img
                  src="https://s.yimg.com/os/creatr-uploaded-images/2022-09/858128d0-3491-11ed-aeec-c03b39ac030c"
                  className="img-fluid"
                  alt="productImage"
                />
              </div>
              <div>
                <img
                  src="https://s.yimg.com/os/creatr-uploaded-images/2022-09/858128d0-3491-11ed-aeec-c03b39ac030c"
                  className="img-fluid"
                  alt="productImage"
                />
              </div>
              <div>
                <img
                  src="https://s.yimg.com/os/creatr-uploaded-images/2022-09/858128d0-3491-11ed-aeec-c03b39ac030c"
                  className="img-fluid"
                  alt="productImage"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  Lorem ipsum adipisicing elit. debitis blanditiis voluptatum.
                  Eligendi
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ 189</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
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
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Smart Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">Apple</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">watch, smart watch</p>
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
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color />
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
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
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button className="button border-0" type="submit">
                      Add To Cart
                    </button>
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <Link to="/compare-product">
                    <IoIosGitCompare className="fs-5 me-2" /> Add to Compare
                  </Link>
                  <Link to="/wishlist">
                    <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                  </Link>
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
                      copyToClipboard(
                        "https://s.yimg.com/os/creatr-uploaded-images/2022-09/858128d0-3491-11ed-aeec-c03b39ac030c"
                      );
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
              <p className="bg-white p=3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                corrupti nemo assumenda voluptas placeat, voluptatum modi non
                accusantium voluptatibus expedita quia ea eos quisquam ipsam
                ipsa veritatis dicta tempora suscipit?
              </p>
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
      <Container className="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
