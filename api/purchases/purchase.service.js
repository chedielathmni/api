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

    getByDriverId: (driverId, results = 0, page = 0, callback) => {


        // * if query.results exists => send back limited number of results
        // * else send all purchases for the 'id' given
        if (results != 0) {
        const start = page * results;
        const end = results;

        pool.query(
            `select * from gas_purchase where driver_id = ${driverId}  ORDER BY id desc limit ${start},${end}`,
            [],
            (err, res) => {
                if (err) {
                    callback(err);
                }
                return callback(null, res);
            }
        );
        }
        else {
            pool.query(
                `select * from gas_purchase where driver_id = ${driverId}`,
                [],
                (err, res) => {
                    if (err) {
                        callback(err);
                    }
                    return callback(null, res);
                }
            );
        }
    
    },


    getCount: (driverId, callback) => {
        pool.query(
            `select count(id) as count from gas_purchase where driver_id = ${driverId}`,
            [],
            (err, res) => {
                if (err) {
                    callback(err);
                }
                return callback(null, res[0]);
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
    },

    getPageCount: (callback) => {

        pool.query(
            `select count(id) as number from gas_purchas`,
            (err, res) => {
                if (err) {
                    callback(err)
                }
                return callback(null, res)
            }
        )
    }
}