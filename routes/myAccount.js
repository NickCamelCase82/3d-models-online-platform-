const router = require('express').Router();

const { User } = require('../db/models');

router.get('/', async (req, res) => {
  const id = req.session.userId;
  const user = await User.findOne({ where: { id }, raw: true });
  res.render('./entries/myAccount', { user });
});

router.get('/creator', async (req, res) => {
  const id = req.session.userId;
  await User.update({ isCreater: true }, { where: { id } });
  const user = await User.findOne({ where: { id } });
  res.render('./entries/myAccount', { user });
});

module.exports = router;
