module.exports = function (app) {
    var User = app.models.user;
    return {
        index: function (req, res) {
            User.find({}, function (err, data) {
                if (err) throw err;
                res.json(data);
            })
        },
        create: function (req, res) {
            User.create(req.body, function (err, data) {
                if (err) throw err;
                res.status(200)
                    .send(data._id.toString());
            });
        },
        show: function (req, res) {
            User.findById(req.params.userId, function (err, data) {
                if (err) throw err;
                if (!data) { res.sendStatus(404); return; }

                res.json(data);

            });
        },
        update: function (req, res) {
            User.findByIdAndUpdate(req.params.userId,
                { $set: req.body },
                { new: true },
                function (err, data) {
                    if (err) throw err;
                    if (!data) { res.sendStatus(404); return; }
                    res.json(data);

                });
        },
        destroy: function (req, res) {
            User.findByIdAndRemove(req.params.userId, function (err, data) {
                if (err) throw err;
                if (!data) { res.sendStatus(404); return; }
                res.json(data);

            });
        }
    };
}