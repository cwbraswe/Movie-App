const router = require('express').Router();
const controller = require('./movies.controller');
const noMethodAllowed = require('../errors/noMethodAllowed');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

router
  .route('/')
  .get(cors(corsOptions), controller.list)
  .all(noMethodAllowed);

router
  .route('/:movieId')
  .get(cors(corsOptions), controller.read)
  .all(noMethodAllowed);

router
  .route('/:movieId/theaters')
  .get(cors(corsOptions), controller.readTheaters)
  .all(noMethodAllowed);

router
  .route('/:movieId/reviews')
  .get(cors(corsOptions), controller.readReviews)
  .all(noMethodAllowed);

module.exports = router;