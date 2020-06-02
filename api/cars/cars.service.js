const pool = require("../../config/database");


module.exports = {
    
    getCar: (carId, callback) => {
        pool.query(
            `select * from car where id = ${carId}`,
            (err, res) => {
                if (err) {
                    callback(err);
                }
                return callback(null, res[0])
            }
        )
    }
}