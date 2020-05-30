const pool = require("../../config/database");


module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into gas_purchase(car_id, purchase_date, price, gas_type, driver_id)
                values(?,?,?,?,?)`,
            [
                data.carId,
                data.purchaseDate,
                data.price,
                data.gasType,
                data.driverId
            ], (err, res) => {
                if (err) {
                    callback(err);
                }
                return callback(null, res);
            } 
        );
    },

    getById: (id, callback) => {
        pool.query(
            `select * from gas_purchase where id = ?`,
            [id],
            (err, res) => {
                if (err) {
                    callback(err);
                }
                return callback(null, res[0]);
            }
        );
    },

    getByDriverId: (driverId, callback) => {
        pool.query(
            `select * from gas_purchase where driver_id = ?`,
            [driverId],
            (err, res) => {
                if (err) {
                    callback(err);
                }
                return callback(null, res);
            }
        );
    
    },

    getAll: callback => {
        pool.query(
            `select * from gas_purchase`,
            [],
            (err, res) => {
                if (err) callback(err)
                return callback(null, res);
            }
        );
    }
}