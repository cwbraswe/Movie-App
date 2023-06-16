const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .distinct("m.movie_id");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readWithTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

function readWithReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId });
}

module.exports = {
  list,
  listIsShowing,
  read,
  readWithTheaters,
  readWithReviews,
};