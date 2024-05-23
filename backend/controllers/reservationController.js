const connection = require('../config/db');

exports.getReservations = (req, res) => {
  connection.query('SELECT * FROM RESERVATION', (error, results) => {
    if (error) {
      return res.status(500).send('Error retrieving reservations');
    }
    res.json(results);
  });
};
