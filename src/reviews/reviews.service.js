const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

function readWithCritic(reviewId){
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ review_id: reviewId })
    .first()
    .then((review) => {
      const critic = {
        critic_id: review.critic_id,
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
        created_at: review.created_at,
        updated_at: review.updated_at,
      };
      return {
        ...review,
        critic,
      };
    });
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  readWithCritic,
  update,
  delete: destroy,
};