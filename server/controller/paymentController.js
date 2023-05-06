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

const createStripeCheckoutSession = async (req, res) => {
  const { cartItems } = req.body;
  try {
    if (!Array.isArray(cartItems)) {
      res.status(400).json({
        success: false,
        message: "cartItems is not an array or is undefined",
      });
      return;
    }
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "AUD",
        product_data: {
          name: item.productTitle,
          description: "Product",
          images: [item.productImage],
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:3000/success?sessionId={CHECKOUT_SESSION_ID}`, // Update this line
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({
      success: true,
      session_id: session.id,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  checkout,
  paymentVerification,
  createStripeCheckoutSession,
};
