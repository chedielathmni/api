const jwt = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.get('authorization');
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: err.message
          })
        } else {
          req.decoded = decoded;
          next()
        }
      })
    }
    else {
      res.json({
        success: 0,
        message: "Access Denied! Unauthorized user"
      })
    }
  }
}