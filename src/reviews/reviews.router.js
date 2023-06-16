const router = require('express').Router();
const controller = require('./reviews.controller');
const noMethodAllowed = require('../errors/noMethodAllowed');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

router
  .route('/:reviewId')
  .put(cors(corsOptions), controller.update)
  .delete(cors(corsOptions), controller.delete)
  .all(noMethodAllowed);

module.exports = router;