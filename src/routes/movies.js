const express = require("express");
const { validateToken } = require("../controllers/user.controller");
const Movie = require("../models/movie");
const router = express.Router();

// like movie

router.post("/like", validateToken, (req, res) => {
  const { movieId } = req.body;
  const { userId } = req.user;
  try {
    Movie.findOne({
      imdbID: movieId,
      user_id: userId,
    })
      .then((movie) => {
        if (!movie) {
          const newMovie = new Movie({
            imdbID: movieId,
            user_id: userId,
          });
          newMovie
            .save()
            .then((result) => {
              const { imdbID } = result;
              res.status(200).json(imdbID);
            })
            .catch((error) => {
              return res.status(500).json({
                error: "Error saving movie. Please try again later." + error,
              });
            });
        } else {
          // unlike movie
          movie
            .remove()
            .then((result) => {
              res.status(200).json({
                message: "Movie successfully removed from favorites",
              });
            })
            .catch((error) => {
              return res.status(500).json({
                error: "Error removing movie. Please try again later." + error,
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "Error fetching movie. Please try again later." + error,
        });
      });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching movie. Please try again later." + error,
    });
  }
});

module.exports = router;
