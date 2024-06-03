const express = require('express');
const cors = require('cors');
require('dotenv').config();

const reservationRoutes = require('./routes/reservationRoutes');
const filmRoutes = require('./routes/filmRoutes');
const seanceRoutes = require('./routes/seanceRoutes');
const salleRoutes = require('./routes/salleRoutes');
const userRoutes = require('./routes/userRoutes');
const espacesRoutes = require('./routes/espaceUtilisateurRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', reservationRoutes);
app.use('/api', filmRoutes);
app.use('/api', seanceRoutes);
app.use('/api', salleRoutes);
app.use('/api', userRoutes);
app.use('/api', espacesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
