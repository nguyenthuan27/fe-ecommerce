import axios from "axios";
import { message } from "antd";
const customAxios = axios.create();

customAxios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error);
    // message.error(error.response?.data?.error?.message || error.message);
    if (axios.isCancel(error)) {
    }
    const response = {
      code: 0,
      data: error?.response?.data,
    };
    message.error(response.data);
    throw response;
  }
);
export { customAxios };
