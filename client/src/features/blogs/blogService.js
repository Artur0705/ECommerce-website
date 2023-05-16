import { axiosInstance, base_url } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axiosInstance.get(`${base_url}blog`);
  if (response.data) {
    return response.data;
  }
};

const getBlog = async (id) => {
  const response = await axiosInstance.get(`${base_url}blog/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getBlogs,
  getBlog,
};
