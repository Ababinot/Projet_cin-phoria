const connection = require('../config/db');

exports.getVue_reservation = (req, res) => {
  connection.query('SELECT * FROM vue_reservation', (error, results) => {
    if (error) {
      return res.status(500).send('Error retrieving reservations');
    }
    res.json(results);
  });
};
