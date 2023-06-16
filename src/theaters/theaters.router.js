const router = require('express').Router();
const controller = require('./theaters.controller');
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

module.exports = router;