const { Router } = require('express');
const dogs = require('./dog')
const temperament = require('./temperament')
// const { getDogHandler } = require('../handles/dogHandles');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs" , dogs)
router.use("/temperaments", temperament)


module.exports = router;
