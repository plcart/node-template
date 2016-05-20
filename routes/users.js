var bodyParser = require('body-parser'),
  router = require('express').Router();
router.use(bodyParser.json());

module.exports = function (app) {
  var userCtrl = app.controllers.userCtrl,
    verifyCtrl = app.controllers.verifyCtrl;


  router.route('/')
    .all(verifyCtrl.authorize)
    .get(userCtrl.index)
    .post(verifyCtrl.authorizeAdmin,userCtrl.create);

  router.route('/:userId')
    .all(verifyCtrl.authorize)
    .get(userCtrl.show)
    .put(verifyCtrl.authorizeAdmin, userCtrl.update)
    .delete(verifyCtrl.authorizeAdmin,userCtrl.destroy);

  app.use('/users', router);

}


