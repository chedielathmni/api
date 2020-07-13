const {
    sendAlert
} = require("./alerts.service");

module.exports = {
    coord: (req, res) => {
        const body = { ...req.body.coords.long, ...req.body.coords.lat };
        console.log(body)
    },
    
    sendAlert: (req, res) => {
        const body = req.body;
        body.createdAt = new Date('now');
        sendAlert(body, (err, results) => {
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
    }
}