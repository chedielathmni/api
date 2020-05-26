const {
  getUserByPhoneNumber,
  getUserByUserId,
  getUsers,
  create
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err.message
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },  
  login: (req, res) => {
    const body = req.body;
    getUserByPhoneNumber(body.phoneNumber, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("body => ", body)
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid phone number or password"
        });
      }
      const result = compareSync(body.password, results.password);

      if (result) {
        results.password = undefined;
        const jsontoken = sign({ phoneNumber: results.phoneNumber }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfully", 
          token: jsontoken
        }, 200);
      } else {

        return res.json({
          success: 0,
          data: "Invalid phone number or password"
        }, 400);
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  /* updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  } */
};
