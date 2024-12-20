import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

export const HeaderProducts = ({ allProducts, setAllProducts, total, countProducts, setCountProducts, setTotal, client, setClient }) => {
    const [active, setActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allFetchedProducts, setAllFetchedProducts] = useState([]); // Almacena todos los productos obtenidos de la API
    const cartRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    // Función para buscar productos utilizando la API
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/get-all`);
            setAllFetchedProducts(response.data); // Almacena todos los productos aquí
        } catch (error) {
            console.error('Error fetching products:', error);
            setAllFetchedProducts([]);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            const filteredProducts = allFetchedProducts.filter(product =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredProducts);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, allFetchedProducts]); // Cambiamos la dependencia a allFetchedProducts en lugar de searchResults

    // Resto del código (sin cambios)


    const onDeleteProduct = (product) => {
        if (product.cartQuantity > 1) {
            const updatedProducts = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, cartQuantity: item.cartQuantity - 1 }
                    : item
            );
            setAllProducts(updatedProducts);
        } else {
            const results = allProducts.filter(item => item.id !== product.id);
            setAllProducts(results);
        }
        setTotal(total - product.unitPrice);
        setCountProducts(countProducts - 1);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    const onAddProductFromSearch = (product) => {
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
        setSearchTerm('');
        setSearchResults([]);
    };

    // Método para realizar el pago de todos los productos
    const onPayAll = async () => {
        const clientEmail = sessionStorage.getItem("LoginCliente");
        
        if (!clientEmail) {
            console.error("Error: El email del cliente no está disponible en sessionStorage.");
            return;
        }
    
        const saleData = {
            clientEmail: clientEmail,
            products: allProducts.map(product => ({
                id: product.id,
                productName: product.productName,
                quantity: product.cartQuantity,
                unitPrice: product.unitPrice,
            })),
        };
    
        try {
            const response = await fetch("http://localhost:8080/api/product-sale/create-sale", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(saleData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.reply || "Error al realizar la compra");
            }
    
            const responseData = await response.json();
    
            if (responseData.error) {
                throw new Error(`Error del servidor: ${responseData.reply}`);
            }
    
            console.log("Compra realizada:", responseData.reply);
    
            onCleanCart();
            console.log ("hollaalalal"); // Limpiar carrito después del pago
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <header>
            <h1 style={{ textAlign: 'center' }}>Tienda Peluqueria UQ</h1>
            
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((product) => (
                        <div 
                            key={product.id} 
                            className="search-result-item"
                            onClick={() => onAddProductFromSearch(product)}
                        >
                            <span>{product.productName} - ${product.unitPrice}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="container-icon">
                <div className="container-cart-icon" onClick={() => setActive(!active)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon-cart">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <div className="count-products">
                        <span id="contador-productos">{countProducts}</span>
                    </div>
                </div>

                <div ref={cartRef} className={`container-cart-products ${active ? '' : "hidden-cart"}`}>
                    {allProducts.length ? (
                        <>
                            <div className="row-product">
                                {allProducts.map(product => (
                                    <div className="cart-product" key={product.id}>
                                        <div className="info-cart-product">
                                            <span className="cantidad-producto-carrito">
                                                {product.cartQuantity}
                                            </span>
                                            <p className="titulo-producto-carrito">
                                                {product.productName}
                                            </p>
                                            <span className="precio-producto-carrito">
                                                ${product.unitPrice}
                                            </span>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon-close" onClick={() => onDeleteProduct(product)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-total">
                                <h3>Total:</h3>
                                <span className="total-pagar">${total}</span>
                            </div>
                            <button className="btn-clear-all" onClick={() => {
                                if (window.confirm("¿Está seguro de que desea vaciar el carrito?")) {
                                    onCleanCart();
                                }
                            }}>
                                Vaciar Carrito
                            </button>
                            <button className="btn-pay-all" onClick={() => {
                                if (window.confirm("¿Desea proceder con el pago de todos los productos en el carrito?")) {
                                    onPayAll();
                                }
                            }}>
                                Pagar Todo
                            </button>
                        </>
                    ) : (
                        <p className="cart-empty">El carrito está vacío</p>
                    )}
                </div>
            </div>
        </header>
    );
};