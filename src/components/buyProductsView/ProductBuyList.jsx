import React, { useState, useEffect } from 'react';
import "./buyProducts.css";

const ProductBuyList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
    const [products, setProducts] = useState([]);

    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const updatedProducts = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, cartQuantity: item.cartQuantity + 1 }
                    : item
            );
            setTotal(total + product.unitPrice);
            setCountProducts(countProducts + 1);
            return setAllProducts(updatedProducts);
        }

        setTotal(total + product.unitPrice);
        setCountProducts(countProducts + 1);
        setAllProducts([...allProducts, { ...product, cartQuantity: 1 }]);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/products/get-all");
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const responseData = await response.json();
            const products = responseData.reply || [];
            setProducts(products);
        } catch (error) {
            console.error("Error:", error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container-items">
            {products.map(product => (
                <div className="item" key={product.id}>
                    <div className="info-product">
                        <h2>{product.productName}</h2>
                        <p className="price">${product.unitPrice}</p>
                        <p className="quantity">Stock: {product.quantity}</p>
                        <button onClick={() => onAddProduct(product)} className="btn-add-cart">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductBuyList;