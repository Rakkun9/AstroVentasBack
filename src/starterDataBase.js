const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // Cambia esto por tu usuario de MySQL
  password: "Cocodrilo2004*", // Cambia esto por tu contraseña de MySQL
  database: "AstroVentas",
});

const products = [
  {
    name: "MacBook Pro",
    model: "2021",
    rating: "4.5/5",
    price: 1999.99,
    image: "https://via.placeholder.com/400",
    description: "Potente laptop para profesionales.",
  },
  {
    name: "Dell XPS 13",
    model: "2022",
    rating: "4.7/5",
    price: 1499.99,
    image: "https://via.placeholder.com/400",
    description: "Ultrabook ligero y potente.",
  },
  {
    name: "HP Spectre x360",
    model: "2021",
    rating: "4.3/5",
    price: 1299.99,
    image: "https://via.placeholder.com/400",
    description: "Convertible versátil y elegante.",
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    model: "2022",
    rating: "4.6/5",
    price: 1799.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop empresarial ultraligera.",
  },
  {
    name: "Asus ROG Zephyrus G14",
    model: "2022",
    rating: "4.8/5",
    price: 1599.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop gaming potente y compacta.",
  },
  {
    name: "Microsoft Surface Laptop 4",
    model: "2021",
    rating: "4.4/5",
    price: 1399.99,
    image: "https://via.placeholder.com/400",
    description: "Elegante y productivo.",
  },
  {
    name: "Acer Predator Helios 300",
    model: "2022",
    rating: "4.6/5",
    price: 1499.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop gaming con alto rendimiento.",
  },
  {
    name: "Razer Blade 15",
    model: "2022",
    rating: "4.7/5",
    price: 2499.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop gaming ultradelgada y potente.",
  },
  {
    name: "LG Gram 17",
    model: "2022",
    rating: "4.5/5",
    price: 1699.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop ultraligera con pantalla grande.",
  },
  {
    name: "Microsoft Surface Pro 8",
    model: "2022",
    rating: "4.4/5",
    price: 1299.99,
    image: "https://via.placeholder.com/400",
    description: "Tablet convertible con teclado desmontable.",
  },
  {
    name: 'Apple iMac 24"',
    model: "2021",
    rating: "4.8/5",
    price: 1799.99,
    image: "https://via.placeholder.com/400",
    description: "Computadora todo en uno con pantalla Retina.",
  },
  {
    name: "Samsung Galaxy Book Pro",
    model: "2022",
    rating: "4.3/5",
    price: 1199.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop ultraligera con pantalla AMOLED.",
  },
  {
    name: "Asus ZenBook 14",
    model: "2022",
    rating: "4.5/5",
    price: 1099.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop compacta y potente.",
  },
  {
    name: "HP Envy x360",
    model: "2022",
    rating: "4.4/5",
    price: 999.99,
    image: "https://via.placeholder.com/400",
    description: "Convertible versátil y elegante.",
  },
  {
    name: "Lenovo Yoga 9i",
    model: "2022",
    rating: "4.6/5",
    price: 1399.99,
    image: "https://via.placeholder.com/400",
    description: "Convertible premium con sonido envolvente.",
  },
  {
    name: "Dell Alienware m15 R6",
    model: "2022",
    rating: "4.7/5",
    price: 1999.99,
    image: "https://via.placeholder.com/400",
    description: "Laptop gaming con refrigeración avanzada.",
  },
];

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
    return;
  }

  // Limpiar la tabla antes de insertar
  db.query("DELETE FROM products", (err) => {
    if (err) {
      console.error("Error al limpiar la tabla:", err.message);
      return;
    }

    // Insertar productos
    const sql = `
      INSERT INTO products (name, model, rating, price, image, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    products.forEach((product) => {
      db.query(
        sql,
        [
          product.name,
          product.model,
          product.rating,
          product.price,
          product.image,
          product.description,
        ],
        (err) => {
          if (err) {
            console.error("Error al insertar producto:", err.message);
          }
        }
      );
    });

    console.log("Datos insertados correctamente.");
    db.end(); // Cerrar la conexión
  });
});
