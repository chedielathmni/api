const {
    getCar
} = require("./cars.service");

module.exports = {
    getCar: (req, res) => {
        const carId = req.params.id;

        getCar(carId, (err, results) => {
            if (err) return;
            if (!results) return res.json({
                success: 0,
                message: 'Record not Found'
            });
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}