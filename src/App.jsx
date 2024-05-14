import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Detials from './pages/Detials';
import Search from './pages/Search';
import MediaPage from './pages/MediaPage';
import Footer from './components/Footer';
import React from 'react';
import appConfig from './assets/ui-config/homeConfig.json';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import SuccessPayment from './components/SuccessPayment';
import { Box } from '@chakra-ui/react';
import OrderHistory from './pages/OrderHistory';
import RequestOverview from './pages/RequestOverview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Detials />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<SuccessPayment />} />
          <Route path="/confirm/:itemId" element={<MediaPage />} />
          <Route path="/orderhistory" element={<OrderHistory/>}/>
          <Route path="/requestoverview" element={<RequestOverview/>}/>
        </Routes>
      </Router>
      <ToastContainer />

    </>
  )
}

export default App
