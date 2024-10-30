import React, { useState, useEffect } from 'react';
import "./buyProducts.css";

const ProductBuyList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/products/get-all");
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const responseData = await response.json();
    
            if (responseData.error) {
                throw new Error("Error del servidor al obtener los productos");
            }
    
            const products = responseData.reply || [];
            console.log("Productos obtenidos:", products);
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
                <div className="item">
                    <div className="info-product">
                    <h2>{product.productName}</h2>
					<p className="price">{product.unitPrice}</p>
                    <p className="cantidad">{product.quantity}</p>
					<button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductBuyList;
