const {
    getAll,
    getById,
    getByDriverId,
    create
} = require("./purchase.service");

module.exports = {
    createPurchase: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    test: 'error',
                    message: err.message
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAllPurchases: (req, res) => {
        getAll((err, results) => {
            if (err) return;
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    getPurchaseById: (req, res) => {
        let id = req.params.id;
        if (!id) id = req.params.driverId
        getById(id, (err, results) => {
            if (err) return;
            if (!results) return res.json({
                success: 0,
                message: 'Records not Found'
            });
            return res.json({
                success: 1,
                data: results
            })
        });
    },

    getPurchaseByDriverId: (req, res) => {
        const driverId = req.params.id;
        getByDriverId(driverId, (err, results) => {
            if (err) return;
            if (!results) return res.json({
                success: 0,
                message: 'Records not Found'
            });
            return res.json({
                success: 1,
                data: results
            })
        });
    }

}