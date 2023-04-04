import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-category/`);

  return response.data;
};

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${base_url}blog-category/`,
    blogCategory,
    config
  );

  return response.data;
};

const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(
    `${base_url}blog-category/${blogCategory.id}`,
    { title: blogCategory.blogCatData.title },
    config
  );

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blog-category/${id}`, config);

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blog-category/${id}`, config);

  return response.data;
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;
