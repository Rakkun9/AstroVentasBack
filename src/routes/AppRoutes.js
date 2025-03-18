// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const AppController = require("../controllers/AppController");

// Rutas de AuthController
router.get("/products", AppController.getProducts);
router.get ("/products/:id", AppController.getProductsId);
router.put ("/products/:id", AppController.updateProduct);
router.delete ("/products/:id", AppController.deleteProduct);
router.post ("/products", AppController.createProduct);
router.post ("/login", AppController.login);

module.exports = router; // Asegúrate de exportar el router