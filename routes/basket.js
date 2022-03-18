const router = require('express').Router();
const { Listing } = require('../db/models');

router.get('/', async (req, res) => {
  const basketId = req.session.basket;
  const itemsArr = [];
  for (let i = 0; i < basketId.length; i++) {
    const item = await Listing.findOne({
      where: { id: basketId[i] },
      raw: true,
    });
    const srcImg = item.modelImage.split(', ');
    const srcImgZero = srcImg[0];
    item.srcImg = srcImg;
    item.srcImgZero = srcImgZero;

    itemsArr.push(item);
  }

  console.log(itemsArr);
  res.render('entries/basket', { itemsArr });
});

router.get('/delete/:id', async (req, res) => {
  const basketId = req.session.basket
  const index = basketId.indexOf(req.params.id)
  const newBasket = basketId.splice(index, 1)
  console.log(newBasket);
  console.log(req.session.basket);

  res.redirect('/basket')
})

module.exports = router;
