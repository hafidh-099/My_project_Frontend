import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import OrderPage from './components/OrderPage/OrderPage';
import Signup from './components/Login_signup/Signup';
import Login from './components/Login_signup/Login';
import Admin from './components/Admin/Admin';
import ConfirmationPage from './components/ConfirmationPage/ConfirmationPage';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CartContext from './components/context/CartContext';

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartContext.Provider value={{ cart, setCart }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmationPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
