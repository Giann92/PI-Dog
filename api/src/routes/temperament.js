const {Router} = require('express');
const {getTemperament} =  require('../handles/temperamentHandler');

const temperamentRouter= Router();

temperamentRouter.get('/', getTemperament);

module.exports = temperamentRouter;
