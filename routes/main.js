const router = require('express').Router();
const { Listing } = require('../db/models')

router.get('/', async (req, res) => {
  const targetListings = await Listing.findAll();
  res.render('entries/main', { targetListings });
});

module.exports = router;
