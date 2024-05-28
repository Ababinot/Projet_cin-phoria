const express = require('express');
const cors = require('cors');
require('dotenv').config();

const reservationRoutes = require('./routes/reservationRoutes');
const filmRoutes = require('./routes/filmRoutes');
const seanceRoutes = require('./routes/seanceRoutes');
const salleRoutes = require('./routes/salleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', reservationRoutes);
app.use('/api', filmRoutes);
app.use('/api', seanceRoutes);
app.use('/api', salleRoutes);
app.use('/api', userRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le Serve vas sur le port ${PORT}`);
});
