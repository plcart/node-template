var uuid = require('node-uuid'),
    multer = require('multer'),
    fileName = '',
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './media/users');
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.replace(/[\S\s]+?\.([\S]+)$/g, '$1');
            fileName = `${uuid.v1()}.${ext}`;
            callback(null, fileName);
        }
    }),
    upload = multer({ storage: storage }).single('profileImage');;

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
            upload(req, res, function (err) {
                if (!err) req.body.profile_image = fileName;
                fileName = "";
                User.findByIdAndUpdate(req.params.userId,
                    { $set: req.body },
                    { new: true },
                    function (err, data) {
                        if (err) throw err;
                        if (!data) { res.sendStatus(404); return; }
                        res.json(data);

                    });
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