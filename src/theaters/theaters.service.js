const knex = require("../db/connection");

function list() {
  return knex("theaters")
    .join("movies_theaters as mt", "theaters.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("theaters.*", "m.*", "mt.is_showing")
}

module.exports = {
  list,
};