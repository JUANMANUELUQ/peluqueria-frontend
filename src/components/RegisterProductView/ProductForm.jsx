import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, InputLabel, InputAdornment, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from "@mui/material";
import { Add, Remove } from '@mui/icons-material';
import './ProductForm.css';

const ProductForm = () => {
    const [id, setId] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false); // Nuevo estado para verificar si es modo edición

    // Función para obtener los productos desde el backend
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

    const handleQuantityChange = (increment) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + increment));
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
                const errorData = await response.json();
                throw new Error(errorData.reply || "Error al registrar el producto");
            }

            const responseData = await response.json();

            if (responseData.error) {
                throw new Error(`Error del servidor: ${responseData.reply}`);
            }

            console.log("Producto registrado:", responseData.reply);

            fetchProducts();
            handleFields();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Nuevo método para manejar la actualización de productos
    const handleUpdate = async (event) => {
        event.preventDefault();

        const updatedProduct = { id, productName, quantity, unitPrice };

        try {
            const response = await fetch(`http://localhost:8080/api/products/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.reply || "Error al actualizar el producto");
            }

            const responseData = await response.json();

            if (responseData.error) {
                throw new Error(`Error del servidor: ${responseData.reply}`);
            }

            console.log("Producto actualizado:", responseData.reply);

            fetchProducts();
            handleFields();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (index) => {
        const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmDelete) {
            try {
                const id = products[index].id; // Obtener el id del producto desde el índice
                const response = await fetch(`http://localhost:8080/api/products/delete/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.reply || "Error al registrar el producto");
                }

                console.log("Producto eliminado:", id);
                fetchProducts();
                handleFields();
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        }
    };

    const handleEdit = (index) => {
        const product = products[index];
        setId(product.id);
        setProductName(product.productName);
        setQuantity(product.quantity);
        setUnitPrice(product.unitPrice);
        setIsEditMode(true); // Cambiar a modo edición
    };

    const handleFields = () => {
        setId("");
        setProductName("");
        setQuantity(1);
        setUnitPrice("");
        setIsEditMode(false);
    };

    return (
        <Box className="container">
            <Box component="form" onSubmit={isEditMode ? handleUpdate : handleSubmit} className="formContainer">
                <Typography variant="h5" gutterBottom>{isEditMode ? "Actualizar Producto" : "Registrar Producto"}</Typography>

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

                {/* Botón para registrar */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ marginTop: 2 }}
                    disabled={isEditMode}
                >
                    Registrar Producto
                </Button>

                {/* Botón para actualizar */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    fullWidth
                    sx={{ marginTop: 2 }}
                    disabled={!isEditMode}
                >
                    Actualizar Producto
                </Button>

                {/* Nuevo botón para limpiar los campos */}
                <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
                    <Button variant="outlined" color="secondary" onClick={handleFields}>
                        Limpiar Campos
                    </Button>
                </Box>
            </Box>

            {/* Tabla a la derecha */}
            <TableContainer component={Paper} className="tableContainer">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID producto</TableCell>
                            <TableCell>Nombre del Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio por Unidad</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.id}</TableCell>
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
