var jwt = require('jsonwebtoken'),
    config = require('../config.js');

module.exports = function (app) {
    function getToken(user) {
        return jwt.sign(user, config.secretKey, {
            expiresIn: 3600
        });
    };
    
    return {
        authorize: function (req, res, next) {
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (!token) { res.sendStatus(403); return; }

            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) { res.sendStatus(401); return; }

                req.currentUser = decoded;
                next();
            });
        },
        authorizeAdmin: function (req, res, next) {
            if (!req.currentUser.admin) { res.sendStatus(403); return; }
            next();
        },
        sign: function (req, res) {
            var token = getToken(req.result);
            res.status(200).json({
                success: true,
                token: token
            });
        }
    };
}