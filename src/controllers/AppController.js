const AppService = require("../services/AppService");

exports.getProducts = async (req, res) => {
  try {
    const data = await AppService.getProducts();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};
exports.getProductsId = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = await AppService.getProductsId(productId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

exports.updateProudct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {editingProduct} = req.body;
    const data = await AppService.updateProduct(productId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const result = await AppService.login(email, password);

    if (!result.success) {
      return res.status(401).json({ success: false, message: result.message });
    }

    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      user: result.user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error en el servidor", error });
  }
};
