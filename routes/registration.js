const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../db/models/');

router.get('/', (req, res) => {
  res.render('entries/registrationForm');
});

router.post('/new', async (req, res) => {
  try {
    const {name, password, email} = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const addUser = await User.create({name, password: hashPassword, email});
    req.session.user = addUser.name;
    req.session.userId = addUser.id;
    console.log('==============',req.session.userid);
    res.json(addUser);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
