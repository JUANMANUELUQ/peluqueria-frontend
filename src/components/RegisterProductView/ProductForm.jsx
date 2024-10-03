import React, { useState } from "react";
import { TextField, Button, Box, Typography, InputLabel, InputAdornment, FormControl } from "@mui/material";
import { IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const ProductForm = () => {
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState("");

    const handleQuantityChange = (increment) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + increment)); // Evita que sea menor que 1
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Producto registrado:", { productName, quantity, unitPrice });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                marginY: "auto",  // Centra verticalmente
                ml: 0             // Alinea el cuadro a la izquierda
            }}
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

            {/* Label para Cantidad alineado a la izquierda */}
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
                Registrar Producto
            </Button>
        </Box>
    );
};

export default ProductForm;
