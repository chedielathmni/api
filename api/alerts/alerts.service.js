const pool = require("../../config/database");


module.exports = {
    
    sendAlert: (data, callback) => {
        pool.query(
            `insert into alert(driver_id, car_id, type, info, created_at, coords, source)
                values(?,?,?,?,?,?,?)`,
            [
                data.driverId,
                data.carId,
                data.alertType,
                data.info,
                new Date(),
                JSON.stringify(data.coords),
                "externe"
            ], (err, res) => {
                if (err) {
                    callback(err);
                }
                return callback(null, res);
            } 
        );
    },
}