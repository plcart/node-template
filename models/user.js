var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    profile_image: {
        type: String,
        default: ''
    }
});

User.methods.getName = function () {
    return (this.first_name + ' ' + this.last_name);
};

User.plugin(passportLocalMongoose);

module.exports = function () {
    var model;
    try {
        model = mongoose.model('User');
    }
    catch (err) { }
    return model || mongoose.model('User', User);
}