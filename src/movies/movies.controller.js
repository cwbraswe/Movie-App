const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reduceProperties = require('../utils/reduce-properties');

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res) {
  const { is_showing } = req.query;
  const data = is_showing ? await service.listIsShowing() : await service.list();
  res.json({ data });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function readTheaters(req, res) {
  const { movieId } = req.params;
  const data = await service.readWithTheaters(movieId);
  res.json({ data });
}

async function readReviews(req, res) {
  const { movieId } = req.params;
  const data = await service.readWithReviews(movieId);
  const reduceReviews = reduceProperties('review_id', {
    critic_id: ['critic', 'critic_id'],
    preferred_name: ['critic', 'preferred_name'],
    surname: ['critic', 'surname'],
    organization_name: ['critic', 'organization_name'],
  });
  const mapCritics = reduceReviews(data);
  res.json({ data: mapCritics });
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
};