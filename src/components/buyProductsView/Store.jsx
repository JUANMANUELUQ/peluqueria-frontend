import React, { useState } from 'react';
import {HeaderProducts} from './HeaderProducts';
import ProductBuyList from './ProductBuyList';
import axios from 'axios';

const Store = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);


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
