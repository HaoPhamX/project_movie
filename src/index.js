import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { DOMAIN } from './util/settings/config';
import ReactDom from 'react-dom';
import './I18n'

//cấu hình realtime (websocket với signalR)

// import * as SignalR from '@aspnet/signalr';

// //đoạn kết để kết nối đến server lắng nghe sự kiện từ server
// export const connection = new SignalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(SignalR.LogLevel.Information).build()

// // đảm báo kết nối thành công thì mới ReactDom
// connection.start().then(() => {
//   ReactDom.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//     ,
//     document.getElementById('root')
//   );
// }).catch((err) => {
//   console.log(err)
// })
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
