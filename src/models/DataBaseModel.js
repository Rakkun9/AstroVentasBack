const mysql = require("mysql2/promise"); // Usamos la versión con soporte para promesas
require("dotenv").config(); // Cargar variables de entorno desde .env

// Configura la conexión a la base de datos MySQL
const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306, // Puerto por defecto de MySQL
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0, // Sin límite de cola
});

// Función para probar la conexión a la base de datos
const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS current_time");
    console.log("Conexión a la base de datos exitosa:", rows[0].current_time);
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1); // Sale del proceso con un código de error
  }
};

// Función para realizar consultas a la base de datos
const query = async (sql, params) => {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    throw err; // Relanza el error para que pueda ser manejado externamente
  }
};

// Manejo del cierre de la base de datos
const closeConnection = async () => {
  try {
    await pool.end();
    console.log("Conexión a la base de datos cerrada.");
    process.exit(0); // Termina el proceso exitosamente
  } catch (err) {
    console.error("Error al cerrar la conexión a la base de datos:", err);
    process.exit(1); // Sale del proceso con un código de error
  }
};

// Captura señales de terminación para cerrar la conexión correctamente
process.on("SIGINT", closeConnection);
process.on("SIGTERM", closeConnection);

// Exportar funciones
module.exports = {
  query,
  testConnection,
};