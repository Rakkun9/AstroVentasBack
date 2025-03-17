const { query } = require("../models/DataBaseModel");

class AppProductsManager {
  static async getProducts() {
    const sql = "SELECT * FROM products";
    const result = await query(sql);
    return result;
  }

  static async getProductsId(productId) {
    try {
      // Obtener los detalles del producto y el nombre de la marca
      const [product] = await query(
        `SELECT 
          p.id, 
          p.name, 
          p.model, 
          p.price, 
          p.image, 
          p.description, 
          p.category_id, 
          b.name AS brand_name
        FROM 
          products p
        JOIN 
          brands b ON p.brand_id = b.id
        WHERE 
          p.id = ?`,
        [productId]
      );

      if (product.length === 0) {
        throw new Error("Producto no encontrado");
      }

      // Obtener la calificación promedio del producto
      const [rating] = await query(
        "SELECT AVG(rating) AS average_rating FROM reviews WHERE product_id = ?",
        [productId]
      );

      // Agregar la calificación y el nombre de la marca al objeto del producto
      const productDetails = {
        ...product[0], // Copia todas las propiedades del producto
        average_rating: rating[0]?.average_rating ?? 0, // Si no hay reseñas, la calificación es 0
      };
      console.log("Producto encontrado:", productDetails);
      console.log(product);

      return productDetails;
    } catch (err) {
      console.error("Error al obtener el producto:", err);
      throw err; // Relanza el error para que pueda ser manejado externamente
    }
  }

  static async updateProduct(productId, editingProduct) {
    try {
      const { name, model, price} =
        editingProduct;

      const sql = `
        UPDATE products 
        SET name = ?, model = ?, price = ?,
        WHERE id = ?
      `;

      const result = await query(sql, [
        name,
        model,
        price,
        productId,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("No se encontró el producto para actualizar");
      }

      return { message: "Producto actualizado correctamente" };
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }
}

module.exports = AppProductsManager;
