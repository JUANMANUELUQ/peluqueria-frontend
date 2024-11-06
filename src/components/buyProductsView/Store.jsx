import React, { useState } from 'react';
import { HeaderProducts } from './HeaderProducts';
import ProductBuyList from './ProductBuyList';
import axios from 'axios';

const Store = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);


  // Función para buscar productos utilizando la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/get-all`);
      console.log(response.data.reply);
      setAllProducts(response.data.reply); // Almacena todos los productos aquí
    } catch (error) {
      console.error('Error fetching products:', error);
      setAllFetchedProducts([]);
    }
  };


  return (
    <div>
      <HeaderProducts
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <ProductBuyList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
    </div>
  );
};

export default Store;
