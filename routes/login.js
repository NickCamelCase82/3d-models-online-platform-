const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('entries/login');
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const { userName, userPassword } = req.body;
    const loginUser = await User.findOne({
      where: { name: userName },
      raw: true,
    });
    const passwordCheck = await bcrypt.compare(userPassword, loginUser.password);
    if (passwordCheck) {
      req.session.user = loginUser.name;
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

module.exports = router;
