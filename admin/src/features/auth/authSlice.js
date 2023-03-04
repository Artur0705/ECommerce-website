import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const userDefaultState = {
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  mobile: null,
  token: null,
};

const initialState = {
  user: userDefaultState,
  isError: false,
  isSuccess: null,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const authSlice = createAsyncThunk({
  name: "auth",
  initialState,
  refucers: {},
  extraReducers: (builder) => {},
});
