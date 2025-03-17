const { query } = require("../models/DataBaseModel");

class AppUserManager {
  static async login(email, password) {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const users = await query(sql, [email, password]);

    if (users.length === 0) {
      return { success: false, message: "Credenciales incorrectas" };
    }

    const user = users[0];

    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.rol },
    };
  }
}

module.exports = AppUserManager;
