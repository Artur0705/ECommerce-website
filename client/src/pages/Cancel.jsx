import React from "react";

const Cancel = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card text-center">
            <div className="card-header bg-danger text-white">
              <h2>Payment Canceled</h2>
            </div>
            <div className="card-body">
              <p>Your payment was canceled. You have not been charged.</p>
              <p>Please try again or contact us if you need assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
