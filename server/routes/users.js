var express = require('express');
var bodyparser = require('body-parser');
var router = express.Router();

/* GET users listing. */
router.use(bodyparser.json());
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
  const user = JSON.parse(req.body.user);
  console.log(user.name);

  const list= [
    'group1',
    'group2',
    'group3'
  ]
  res.send(list);
});

module.exports = router;
