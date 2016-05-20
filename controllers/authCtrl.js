var passport = require('passport');

module.exports = function (app) {
    var User = app.models.user;
    return {
        login: function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) return next(err);
                if (!user) return res.sendStatus(401);

                req.logIn(user, function (err) {
                    if (err) return res.sendStatus(500);

                    req.result = user;
                    next();
                });

            })(req, res, next);
        },
        logout: function (req, res) {
            req.logout();
            res.sendStatus(200);
        },
        register: function (req, res) {
            User.register(new User({ username: req.body.username, admin: true }),
                req.body.password, function (err, user) {
                    if (err)
                        return res.sendStatus(500);
                    user.firstname = req.body.firstname || "";
                    user.lastname = req.body.lastname || "";
                    user.save(function (err, user) {
                        passport.authenticate('local')(req, res, function () {
                            return res.sendStatus(200);
                        });
                    });
                });
        }
    };
}