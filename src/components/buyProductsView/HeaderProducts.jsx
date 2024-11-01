import React, { useState, useEffect } from 'react';

export const HeaderProducts = ({ allProducts, setAllProducts, total, countProducts, setCountProducts, setTotal }) => {
    const [active, setActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Búsqueda en el backend cada vez que cambia el término de búsqueda
    useEffect(() => {
        if (searchTerm) {
            const searchProducts = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/products/search?query=${searchTerm}`);
                    if (!response.ok) {
                        throw new Error('Error en la búsqueda de productos');
                    }
                    const data = await response.json();
                    setSearchResults(data.reply || []);
                } catch (error) {
                    console.error("Error al buscar productos:", error);
                    setSearchResults([]);
                }
            };
            searchProducts();
        } else {
            setSearchResults([]); // Limpiar resultados si no hay término de búsqueda
        }
    }, [searchTerm]);

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
        // Similar lógica que el método en ProductBuyList
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
        setSearchTerm(''); // Limpiar el campo de búsqueda después de añadir el producto
        setSearchResults([]);
    };

    return (
        <header>
            <h1>Tienda</h1>
            
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Buscar productos..." 
            />

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

                <div className={`container-cart-products ${active ? '' : "hidden-cart"}`}>
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
                            <button className="btn-clear-all" onClick={onCleanCart}>
                                Vaciar Carrito
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