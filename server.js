const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // 👈 importa cors

dotenv.config(); // Cargar variables de entorno

const app = express();

// ⚠️ Habilita CORS SOLO para tu frontend en producción
app.use(cors({ origin: 'https://frontend-irongames.vercel.app' }));

/*app.use(cors()); // 👈 habilita CORS*/
app.use(express.json()); // Permite recibir datos JSON

// Rutas
const gameRoutes = require('./routes/gameRoutes');
app.use('/api', gameRoutes); // Prefijo "api" para las rutas

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.log('Error conectando a MongoDB:', err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
