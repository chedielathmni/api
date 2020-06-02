const {
  getUserByPhoneNumber,
  getUserByUserId,
  getUsers,
  create,
  updatePassword
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const salt = genSaltSync(10);

module.exports = {
    createUser: (req, res) => {
    const body = req.body;
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
          user: results,
          token: jsontoken
        }, 200);
      } else {

        return res.json({
          success: 0,
          data: "Invalid phone number or password"
        });
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

  updatePassword: (req, res) => {
    const body = req.body;
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err)
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'User not found'
        })
      }
      const result = compareSync(body.password, results.password);
      if (!result) {
        return res.json({
          success: 0,
          message: 'Wrong password'
        })
      }
      if (result) {
        body.newPassword = hashSync(body.newPassword, salt);
        updatePassword(id, body.newPassword, (err, results) => {
          if (err) {
            console.log(err)
            return
          }
          return res.json({
            success: 1,
            message: 'Password changed'
          })
        } )
      }
      
    })
  }
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
