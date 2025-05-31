import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Profile from './pages/Profile';
import { UserProvider } from './contexts/UserContext';
import { ProductProvider } from './contexts/ProductContext';
import ProductDetail from './pages/ProductDetail';
import RegisterSuccess from './pages/RegisterSuccess';
import LogoutSuccess from './pages/LogoutSuccess';
import Support from './pages/Support';
import About from './pages/About';
import Categories from './pages/Categories';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import ProductForm from './components/ProductForm';

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <CssBaseline />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <UserProvider>
          <ProductProvider>
            <CartContext.Provider value={{ cart, setCart }}>
              <Routes>
                <Route element={<Layout><Outlet /></Layout>}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/register-success" element={<RegisterSuccess />} />
                  <Route path="/logout-success" element={<LogoutSuccess />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/add-product" element={<ProductForm />} />
                </Route>
                <Route 
                  path="/admin/*" 
                  element={
                    <PrivateRoute role="ADMIN">
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartContext.Provider>
          </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

