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
  const priceSum = itemsArr.reduce((acc, curr) => acc + curr.price, 0);

  res.render('entries/basket', { itemsArr, priceSum });
});

router.get('/delete/:id', async (req, res) => {
  const basketId = req.session.basket;
  const index = basketId.indexOf(req.params.id);
  const newBasket = basketId.splice(index, 1);

  res.redirect('/basket');
});

module.exports = router;
