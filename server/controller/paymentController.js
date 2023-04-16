const RazorPay = require("razorpay");

const instance = new RazorPay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const checkout = async (req, res) => {
  const option = {
    amount: 50000,
    currency: "AUD",
  };

  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};

module.exports = {
  checkout,
  paymentVerification,
};
