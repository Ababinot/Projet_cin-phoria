const express = require('express');
const cors = require('cors');
require('dotenv').config();

const reservationRoutes = require('./routes/reservationRoutes');
const filmRoutes = require('./routes/filmRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', reservationRoutes);
app.use('/api', filmRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le Serve vas sur le port ${PORT}`);
});
