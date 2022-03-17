const router = require('express').Router();
const { Listing } = require('../db/models');

router.get('/:id', async (req, res) => {
  // console.log(req.params.id);
  const currListing = await Listing.findOne({
    where: { id: req.params.id },
    raw: true,
  });
  const srcImg = currListing.modelImage.split(', ');
  const srcImgZero = srcImg[0];
  currListing.srcImg = srcImg;
  currListing.srcImgZero = srcImgZero;

  res.render('entries/listing', currListing);
});

module.exports = router;
