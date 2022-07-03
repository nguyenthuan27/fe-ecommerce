import { customAxios } from "../utils/custom-axios";
const serverEndpoint = process.env.REACT_APP_API_URL;
const serverProvince = process.env.REACT_APP_API_PROVINCE;
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
  getListProductForHome: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/product/getlistproductforhome`,
    });
    return res.data;
  },
  getDetailProductById: async (id) => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/product/getproductdetail?id=${id}`,
    });
    return res.data;
  },
  getProvince: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverProvince}`,
    });
    return res.data;
  },

  createBill: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/bill/create`,
      data: data,
    });
    return res.data;
  },

  geProductDetail: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/product/getproductdetail`,
      data: {
        id: data.id,
        list_opition: data.listOption,
      },
    });
    return res.data;
  },
};
