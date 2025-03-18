const AppProductsManager = require("../services/AppProductsManager");
const AppUserManager = require("../services/AppUserManager");

exports.getProducts = async () => {
  const data = await AppProductsManager.getProducts();
  return data;
};
exports.getProductsId = async (productId) => {
  const data = await AppProductsManager.getProductsId(productId);
  return data;
};

exports.updateProduct = async (productId, editingProduct) => {
  const data = await AppProductsManager.updateProduct(productId, editingProduct);
  return data;
};

exports.deleteProduct = async (productId) => {
  const data = await AppProductsManager.deleteProduct(productId);
  return data;
};

exports.createProduct = async (newProduct) => {
  const data = await AppProductsManager.createProduct(newProduct);
  return data;
};


exports.login = async (email, password) => {
  const data = await AppUserManager.login(email, password);
  return data;
};
