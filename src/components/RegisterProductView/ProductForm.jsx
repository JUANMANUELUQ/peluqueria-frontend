import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, InputLabel, InputAdornment, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from "@mui/material";
import { Add, Remove } from '@mui/icons-material';
import './ProductForm.css';

const ProductForm = () => {
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);

    // Función para obtener los productos desde el backend
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/products/get_all");
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Hook para cargar los productos cuando la página se carga
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleQuantityChange = (increment) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + increment)); // Evita que sea menor que 1
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProduct = { productName, quantity, unitPrice };

        try {
            const response = await fetch("http://localhost:8080/api/products/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error("Error al registrar el producto");
            }

            const result = await response.json();
            console.log("Producto registrado:", result);

            // Actualizar productos después de registrar uno nuevo
            await fetchProducts();

            // Limpiar los campos
            setProductName("");
            setQuantity(1);
            setUnitPrice("");
            setSelectedProductIndex(null);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const handleEdit = (index) => {
        const product = products[index];
        setProductName(product.productName);
        setQuantity(product.quantity);
        setUnitPrice(product.unitPrice);
        setSelectedProductIndex(index);
    };

    return (
        <Box className="container">
            {/* Formulario a la izquierda */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="formContainer"
            >
                <Typography variant="h5" gutterBottom>Registrar Producto</Typography>

                <TextField
                    fullWidth
                    label="Nombre del Producto"
                    variant="outlined"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    margin="normal"
                    required
                />

                <InputLabel sx={{ textAlign: "left", marginTop: 2 }}>Cantidad</InputLabel>
                <Box display="flex" alignItems="center" marginY={1}>
                    <IconButton onClick={() => handleQuantityChange(-1)}>
                        <Remove />
                    </IconButton>
                    <TextField
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{ width: 80, textAlign: "center" }}
                    />
                    <IconButton onClick={() => handleQuantityChange(1)}>
                        <Add />
                    </IconButton>
                </Box>

                <TextField
                    fullWidth
                    label="Precio por Unidad"
                    variant="outlined"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    margin="normal"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    type="number"
                    required
                />

                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
                    {selectedProductIndex !== null ? "Actualizar Producto" : "Registrar Producto"}
                </Button>
            </Box>

            {/* Tabla a la derecha */}
            <TableContainer component={Paper} className="tableContainer">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio por Unidad</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>${product.unitPrice}</TableCell>
                                <TableCell>
                                    <Link href="#" onClick={() => handleEdit(index)} sx={{ marginRight: 2 }}>
                                        Editar
                                    </Link>
                                    <Link href="#" onClick={() => handleDelete(index)}>
                                        Eliminar
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductForm;
