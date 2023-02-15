import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Meta from "../components/Meta";
import cross from "../images/cross.svg";
import watch from "../images/watch.jpg";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"Conpare Products"} />
      <BreadCrumb title="Compare Products" />
      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src={cross}
                  alt="cross"
                  className="position-absolute img-fluid cross"
                />
                <div className="product-card-image">
                  <img src={watch} alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Samsung Tab S8</h5>
                  <h6 className="price mb-3 mt-3">$ 1488</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Apple</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src={cross}
                  alt="cross"
                  className="position-absolute img-fluid cross"
                />
                <div className="product-card-image">
                  <img src={watch} alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Samsung Tab S8</h5>
                  <h6 className="price mb-3 mt-3">$ 1488</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Apple</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
