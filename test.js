const bcrypt = require('bcrypt');

const password = 'miContraseña';
const hashFromDB = '$2b$10$MqwrGpef51e9pSUaLtopr.wntCk4.MJwRS5cFQZ9DbnabNQBtVD5O';

bcrypt.compare(password, hashFromDB)
  .then(match => {
    console.log('¿Coincide el password con el hash?', match);
  })
  .catch(err => {
    console.error('Error en bcrypt compare:', err);
  });
