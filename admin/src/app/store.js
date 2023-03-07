import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import brandReducer from "../features/brand/brandSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import prodCategoryReducer from "../features/prodCategory/prodCategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    prodCategory: prodCategoryReducer,
  },
});
