/// create component login
import React, { Component } from "react";
import Helmet from "../components/Helmet";

const Login = () => {
  return (
    <>
      <Helmet title="Login" />
      <div className="container">
        <div className="login">
          <div className="login__title">Đăng nhập</div>
          <div className="login__content">
            <div className="login__content__item">
              <div className="login__content__item__title">Tài khoản</div>
              <div className="login__content__item__input">
                <input type="text" placeholder="Nhập tài khoản" />
              </div>
            </div>
            <div className="login__content__item">
              <div className="login__content__item__title">Mật khẩu</div>
              <div className="login__content__item__input">
                <input type="password" placeholder="Nhập mật khẩu" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
