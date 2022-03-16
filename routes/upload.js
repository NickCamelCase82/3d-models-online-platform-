const router = require('express').Router();
const multer = require('multer');
const { Listing } = require('../db/models');

const upload = multer({ dest: 'public/uploads/' });

router.get('/', (req, res) => {
  res.render('upload/uploadModel');
});

router.post('/', upload.array('Photo-1'), (req, res) => {
  const newPath = req.files.map((elem) => elem.path.slice(7)).join(', ');
  const listing = Listing.create({
    name: req.body.name, description: req.body.description, price: req.body.price, sku: 'ABC', modelLink: 'link', modelImage: newPath, user_id: req.session.userId,
  });
  res.redirect('/');
});

module.exports = router;
