import React from "react";

import { Route, Switch } from "react-router-dom";
import '././../sass/components/_order-product.scss';
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import OrderProduct from "../pages/OrderProduct";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/order-product" component={OrderProduct} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default Routes;
