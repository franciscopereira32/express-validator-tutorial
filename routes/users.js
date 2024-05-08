const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator');

/* GET users page. */
router.get('/', function (req, res) {
  res.send();
});

router.post('/', [
  check('name').not().isEmpty().isLength({min: 5}).withMessage('Name must have more than 5 characters'),
  check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
  check('classYear', 'Class Year should be a number').not().isEmpty().isInt(),
  check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
  check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
  check('weekday', 'Choose a weekday').optional().not().isIn(['Sunday', 'Saturday']),
],
function (req, res) {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    res.send({});
  }
});

module.exports = router;
