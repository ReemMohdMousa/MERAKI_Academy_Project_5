const { genrateToken } = require("./config");
const pool = require("../models/db");

//const  = require("../models/patientSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  const { firstName, lastName, age, email, password, role_id } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 7);
    console.log(encryptedPassword);
    const query = `INSERT INTO users (firstName, lastName, age, email, password,role_id) VALUES ($1,$2,$3,$4,$5,$6)RETURNING *`;
    const data = [
      firstName,
      lastName,
      age,
      email.toLowerCase(),
      encryptedPassword,
       role_id || 2,
    ];
    pool
    .query(query, data)
    .then((result) => {
      console.log("result",result);
      const payload = {
        userId: result.rows[0].user_id,
        //country: result.rows[0].country,
        role: result.rows[0].role_id,
      };

      const options = {
        expiresIn: "24h",
      };
      const token = genrateToken(payload, options);
  
     
      res.status(200).json({
        success: true,
        token: token,
        //userId: result.rows[0].id,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
  } catch (error) {
    console.log(error);
  }

};
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result.rows)
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].user_id,
              //country: result.rows[0].country,
              role: result.rows[0].role_id,
            };
      
            const options = {
              expiresIn: "24h",
            };
            const token = genrateToken(payload, options);
        
            if (token) {
              return res.status(200).json({
                success: true,
                message: `Valid login credentials`,
                token,
                userId: result.rows[0].id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};
const checkGoogleUser = (req, res) => {
  const { firstName, lastName, email } = req.body;

  const role_id = 2;
  const password = "none";

  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((results) => {
      if (results.length == 0) {
        //*register him as a new user
        const newUser = new usersModel({
          firstName,
          lastName,
          email,
          password,
          role,
        });

        newUser
          .save()
          .then((results) => {
            console.log(results);
            //*if the registeration went correctly, log the user in
            if (results) {
              usersModel
                .findOne({ email })
                .populate("role")
                .then((results) => {
                  //if the email is not exsisted return an error msg
                  if (!results) {
                    res.status(403).json({
                      success: false,
                      message: `The email or the password is incorrect`,
                    });
                  }
                  //generate a token for google user
                  const payload = {
                    userId: results._id,
                    firstName: results.firstName,
                    lastName: results.lastName,
                    role: results.role,
                  };
                  const options = {
                    expiresIn: process.env.TOKEN_EXP_Time,
                  };
                  const token = jwt.sign(payload, process.env.SECRET, options);

                  res.status(200).json({
                    success: true,
                    message: `Valid login credentials`,
                    token: token,
                    user: results,
                  });
                })
                .catch((err) => {
                  res.json(err);
                });
            }
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        //*if already registered, login
        usersModel
          .findOne({ email })
          .populate("role")
          .then((results) => {
            //if the email is not exsisted return an error msg
            if (!results) {
              res.status(403).json({
                success: false,
                message: `The email or the password is incorrect`,
              });
            }
            //generate a token for google user
            const payload = {
              userId: results._id,
              firstName: results.firstName,
              lastName: results.lastName,
              role: results.role,
            };
            const options = {
              expiresIn: process.env.TOKEN_EXP_Time,
            };
            const token = jwt.sign(payload, process.env.SECRET, options);

            res.status(200).json({
              success: true,
              message: `Valid login credentials`,
              token: token,
              user: results,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  register,
  login,
  checkGoogleUser
};
