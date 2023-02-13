import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage';
import DetailContact from './containers/DetailContact';
import FormContact from './containers/FormContact';
import HomePageRedux from './containers/HomePageRedux';

import { store } from './store/employeeStore';
import { Provider } from 'react-redux';
import DetailContactRedux from './containers/DetailContactRedux';
import FormContactRedux from './containers/FormContactRedux';
// import Car from './containers/CarComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/detail/:contactId' element={<DetailContact />} />
          <Route path='/form' element={<FormContact />} />
          <Route path='/redux' element={<HomePageRedux />} />
          <Route path='/redux/detail/:contactId' element={<DetailContactRedux />} />
          <Route path='redux/form' element={<FormContactRedux />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
