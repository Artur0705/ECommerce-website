import { axiosInstance, config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const getProducts = async () => {
  const response = await axiosInstance.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axiosInstance.post(
    `${base_url}product/`,
    product,
    config()
  );

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axiosInstance.put(
    `${base_url}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      brand: product.productData.brand,
      category: product.productData.category,
      tags: product.productData.tags,
      color: product.productData.color,
      quantity: product.productData.quantity,
      images: product.productData.images,
    },
    config()
  );

  return response.data;
};

const getProduct = async (id) => {
  const response = await axiosInstance.get(
    `${base_url}product/${id}`,
    config()
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(
    `${base_url}product/${id}`,
    config()
  );
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};

export default productService;
