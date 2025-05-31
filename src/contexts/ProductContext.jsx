import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  });

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      originalPrice: parseFloat(productData.price),
      discount: parseFloat(productData.discount) || 0,
      rating: parseFloat(productData.rating) || 0,
      reviewCount: parseInt(productData.reviewCount) || 0,
      images: productData.images || [], // تغییر از image به images
      brand: productData.brand,
      categories: productData.categories || [],
      stock: parseInt(productData.stock) || 0,
      isNew: productData.isNew || false,
      isBestSeller: productData.isBestSeller || false,
      isSpecialOffer: productData.isSpecialOffer || false
    };

    // بررسی برای جلوگیری از تکرار محصول
    const isDuplicate = products.some(p => p.name === productData.name);
    if (isDuplicate) {
      throw new Error('این محصول قبلاً ثبت شده است');
    }

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);