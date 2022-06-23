import { customAxios } from "../utils/custom-axios";
const serverEndpoint = process.env.REACT_APP_API_URL;

export const handleResponse = (res) => {
  const data = res?.data?.data;
  return data;
};

export const handleError = (err) => {
  console.error(err);
  throw err;
};

export default {
  getListProductAll: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/product/getlistproductall`,
    });

    return res.data;
  },
};
