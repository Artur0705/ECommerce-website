import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};

const createProdCategory = async (prodCategory) => {
  const response = await axios.post(
    `${base_url}category/`,
    prodCategory,
    config
  );

  return response.data;
};

const prodCategoryService = {
  getProductCategories,
  createProdCategory,
};

export default prodCategoryService;
