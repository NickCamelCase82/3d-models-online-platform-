const router = require('express').Router();
const { Listing } = require('../db/models');

router.get('/:id', async (req, res) => {
  res.render('entries/listing');
});

module.exports = router;
