const RazorPay = require("razorpay");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const instance = new RazorPay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  const option = {
    amount: amount * 100,
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

const createStripePaymentIntent = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "AUD",
    });

    res.json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const confirmStripePayment = async (req, res) => {
  const { paymentIntentId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    res.json({
      success: true,
      paymentIntent,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  checkout,
  paymentVerification,
  createStripePaymentIntent,
  confirmStripePayment,
};
