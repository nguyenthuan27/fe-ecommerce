import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import toast, { Toaster } from "react-hot-toast";
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './sass/index.scss'

import Layout from './components/Layout'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster toastOptions={{ position: "top-center" }} />
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
