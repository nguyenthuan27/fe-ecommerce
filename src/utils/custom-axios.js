import axios from "axios";
import { message } from "antd";
const customAxios = axios.create();

customAxios.interceptors.request.use(
  async (config) => {
    // if (!window.navigator.onLine) {
    //   totalNoInternetRequest++;

    //   let cancelTokenSource = axios.CancelToken.source();
    //   config.cancelToken = cancelTokenSource.token;

    //   cancelTokenSource.cancel(NO_INTERNET);
    // }

    // if (isAuthenticatedUser()) {
    //   let authInfo = JSON.parse(localStorage.getItem("Authorization1"));
    //   config.headers["Authorization1"] = `Bearer ${authInfo.token}`;
    // }
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
    console.log("error1", error);
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
