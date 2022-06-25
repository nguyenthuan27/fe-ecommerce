import { configureStore } from "@reduxjs/toolkit";

import productModalReducer from "./product-modal/productModalSlice";
import paymentModalReducer from "./payment-modal/paymentModalSlice";
import cartItemsReducer from "./shopping-cart/cartItemsSlide";

export const store = configureStore({
  reducer: {
    productModal: productModalReducer,
    cartItems: cartItemsReducer,
    paymentModal: paymentModalReducer,
  },
});
