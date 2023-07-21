const {Router} = require('express');
const {getDogHandler, getDogIdHandler, createDogs} = require('../handles/dogHandles');


const dogRouter = Router();


dogRouter.get('/' , getDogHandler);
dogRouter.get('/:id', getDogIdHandler);
dogRouter.post('/', createDogs)




module.exports = dogRouter;