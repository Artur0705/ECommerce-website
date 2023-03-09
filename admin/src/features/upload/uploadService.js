import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}`, data, config);
  return response.data;
};

const uploadService = {
  uploadImg,
};

export default uploadService;
