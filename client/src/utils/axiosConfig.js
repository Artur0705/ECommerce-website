import axios from "axios";

export const base_url = "http://localhost:8000/api/";
const getTokenFromLocalStorage = () => {
  const customerData = localStorage.getItem("customer");
  return customerData ? JSON.parse(customerData) : null;
};

export const config = () => ({
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage() !== null
        ? getTokenFromLocalStorage().token
        : ""
    }`,
    Accept: "application/json",
  },
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    const customerData = localStorage.getItem("customer");
    const token = customerData ? JSON.parse(customerData).token : null;
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
