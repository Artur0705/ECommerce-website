const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqId = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMondoDbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const crypto = require("crypto");

// Register User

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Username or Password !");
  }
});

// Admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorized");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Username or Password !");
  }
});

// Handle Refresh Token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("No refresh token found in cookies !");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user?.id !== decoded?.id) {
      throw new Error("Something went wrong with refresh token !");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// Logout User

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("No refresh token found in cookies !");
  const refreshToken = cookie?.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.json("Successfully logged out !");
});

// Update User

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Save user address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const saveUserAddress = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(saveUserAddress);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all users

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get single user

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getUser = await User.findById(id);
    res.json({ getUser });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete user

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({ deleteUser });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json({
      message: "User has been blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json({
      message: "User has been unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, newPassword } = req.body;
  validateMongoDbId(_id);

  try {
    // Find the user by id
    const user = await User.findOne({ _id });

    // Check if the current password matches the stored password
    const isMatch = await user.isPasswordMatched(currentPassword);

    if (!isMatch) {
      res.status(401);
      throw new Error("Current password is incorrect");
    }

    // Update the password
    user.password = newPassword;

    // Save the updated user
    const updatedUser = await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `http://localhost:3000/reset-password/${token}`;
    const data = {
      to: email,
      subject: "Password Reset Request",
      html: `
      <html>
        <head>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
            body {
              margin: 0;
              padding: 0;
              font-family: 'Montserrat', sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              margin-top: 0;
              margin-bottom: 10px;
            }
            
            .body {
              background-color: #f7f7f7;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-top: 20px;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              line-height: 1.5;
              color: #444;
              margin-bottom: 20px;
            }
            
            .support {
              font-size: 16px;
              line-height: 1.5;
              color: #444;
            }
            .footer {
              font-size: 14px;
              font-weight: 400;
              color: #666;
              text-align: center;
              margin-top: 30px;
              margin-bottom: 0;
            }
            .button{
              align-items: center;
              background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
              border: 0;
              border-radius: 8px;
              box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
              box-sizing: border-box;
              color: #FFFFFF !important;
              display: flex;
              font-family: Phantomsans, sans-serif;
              font-size: 20px;
              justify-content: center;
              line-height: 1em;
              max-width: 100%;
              min-width: 140px;
              padding: 3px;
              text-decoration: none;
              user-select: none;
              -webkit-user-select: none;
              touch-action: manipulation;
              white-space: nowrap;
              cursor: pointer;
            }
            
            .button:active,
            .button:hover {
              outline: 0;
            }
            
            .button span {
              background-color: rgb(5, 6, 45);
              padding: 16px 24px;
              border-radius: 6px;
              width: 100%;
              height: 100%;
              transition: 300ms;
            }
            
            .button:hover span {
              background: none;
            }
            
            @media (min-width: 768px) {
              .button {
                font-size: 24px;
                min-width: 196px;
              }
            }
            
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://www.ithinktech.uz/static/media/logo.e63106f39e29efce6fe8.png" alt="Logo" style="height: 50px; margin-bottom: 10px;">
              <h1 class="title">Reset Your Password</h1>
            </div>
            <div class="body">
              <p class="message">Hi ${user.firstName},</p>
              <p class="message">We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
              <p class="message">To reset your password, click the button below:</p>
              <div style="text-align: center;">
                <a href="${resetURL}" class="button" role="button"><span class="text">Reset Password</span></a>
              </div>
              <p class="message">This link is valid for the next 10 minutes.</p>
            </div>
            <p class="support">If you have any questions or need further assistance, please contact our support team at <a href="mailto:info@ithinktech.com">info@ithinktech.com</a>.</p>
            <p class="footer">This email was sent by iThinkTech Inc., 123 Collins str. Melbourne,Victoria,3000</p>
          </div>
        </body>
      </html>
    `,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);

  try {
    const deleteProductFromCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);

  try {
    const cartItem = await Cart.findOne({
      userId: _id,
      _id: cartItemId,
    });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;
  const { _id } = req.user;

  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
      user: _id,
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
};
