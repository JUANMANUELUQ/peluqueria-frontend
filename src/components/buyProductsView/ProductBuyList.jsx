import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import "./buyProducts.css";

const ProductBuyList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState(["", ""]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [priceError, setPriceError] = useState("");

    const onAddProduct = (product) => {
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
            const response = await axios.get("http://localhost:8080/api/products/get-all");
            setProducts(response.data.reply || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filtra los productos basados en el searchTerm y el rango de precios
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priceRange[0] === "" || product.unitPrice >= Number(priceRange[0])) &&
        (priceRange[1] === "" || product.unitPrice <= Number(priceRange[1]))
    );

    // Ordena los productos
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.unitPrice - b.unitPrice;
        } else if (sortOrder === 'desc') {
            return b.unitPrice - a.unitPrice;
        } else if (sortOrder === 'a-z') {
            return a.productName.localeCompare(b.productName);
        } else {
            return b.productName.localeCompare(a.productName);
        }
    });

    // Función para limpiar todos los filtros
    const clearFilters = () => {
        setSearchTerm("");
        setPriceRange(["", ""]);
        setSortOrder("asc");
        setPriceError("");
    };

    // Maneja el cambio en los rangos de precios y la validación
    const handlePriceChange = (index, value) => {
        const updatedRange = [...priceRange];
        updatedRange[index] = value;

        if (value && (Number(value) < 1 || Number(value) > 1000000)) {
            setPriceError("Por favor, ingrese un valor entre 1 y 1,000,000.");
        } else {
            setPriceError("");
        }

        setPriceRange(updatedRange);
    };

    return (
        <div className="container">
            <div className="filters">
                <label>Buscar por nombre de producto</label>
                <TextField
                    label="Buscar producto"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <label>Rango de precios (1 a 1,000,000)</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <TextField
                        label="Mínimo"
                        variant="outlined"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        error={!!priceError}
                        helperText={priceError}
                    />
                    <TextField
                        label="Máximo"
                        variant="outlined"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        error={!!priceError}
                        helperText={priceError}
                    />
                </div>
                <label>Ordenar por</label>
                <TextField
                    select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    variant="outlined"
                >
                    <MenuItem value="asc">Precio: Bajo a Alto</MenuItem>
                    <MenuItem value="desc">Precio: Alto a Bajo</MenuItem>
                    <MenuItem value="a-z">Nombre: A a Z</MenuItem>
                    <MenuItem value="z-a">Nombre: Z a A</MenuItem>
                </TextField>
                <button className="clear-filters-btn" onClick={clearFilters}>
                    Limpiar filtros
                </button>
            </div>

            <div className="container-items">
                {sortedProducts.length === 0 ? (
                    <p className="no-products-message">No hay productos disponibles para mostrar.</p>
                ) : (
                    sortedProducts.map(product => (
                        <div className="item" key={product.id}>
                            <div className="info-product">
                                <h2>{product.productName}</h2>
                                <p className="price">${product.unitPrice}</p>
                                <p className="quantity">Stock: {product.quantity}</p>
                                {product.quantity === 0 ? (
                                    <p className="sold-out">Sold Out</p>
                                ) : (
                                    <button onClick={() => onAddProduct(product)} className="btn-add-cart">
                                        Añadir al carrito
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductBuyList;
