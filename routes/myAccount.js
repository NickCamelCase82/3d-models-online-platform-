const router = require('express').Router();

const { User } = require('../db/models');
const { Listing } = require('../db/models');

router.get('/', async (req, res) => {
  const id = req.session.userId;
  const user = await User.findOne({ where: { id }, raw: true });
  let basket = req.session.basket

  const newArr = []
  for (let i = 0; i < basket.length; i++) {
    const download = await Listing.findOne({ where: { id: basket[i] } , raw: true });
    newArr.push(download)
  }
  
  console.log(newArr);
  
  res.render('./entries/myAccount', { user, newArr });
});

router.get('/creator', async (req, res) => {
  const id = req.session.userId;
  await User.update({ isCreater: true }, { where: { id } });
  const user = await User.findOne({ where: { id } });
  res.render('./entries/myAccount', { user });
});

module.exports = router;
