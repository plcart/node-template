var bodyParser = require('body-parser'),
  router = require('express').Router();
router.use(bodyParser.json());

module.exports = function (app) {
    var authCtrl = app.controllers.authCtrl,
        verifyCtrl = app.controllers.verifyCtrl;

    router.post('/login',authCtrl.login, verifyCtrl.sign);
    router.post('/register',authCtrl.register);
    router.get('/logout',authCtrl.logout);
    
    app.use('/auth', router);
}