const { pool } = require("../models/db");

const userCount = (req, res) => {
  pool
    .query(`SELECT COUNT(*) FROM users`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const postCount = (req, res) => {
  pool
    .query(`SELECT COUNT(*) FROM posts`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const likeCount = (req, res) => {
  pool
    .query(`SELECT COUNT(*) FROM likes`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const registeredUserPerDay = (req, res) => {
  pool
    .query(
      `SELECT extract(DAY FROM created_at) AS "Date of day", COUNT(*) FROM users GROUP BY extract(DAY FROM created_at)`
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const addedPostPerDay = (req, res) => {
  pool
    .query(
      `SELECT extract(DAY FROM created_at) AS "Date of day", COUNT(*) FROM posts GROUP BY extract(DAY FROM created_at)`
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = {
  userCount,
  postCount,
  likeCount,
  registeredUserPerDay,
  addedPostPerDay,
};
