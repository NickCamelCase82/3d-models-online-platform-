const router = require('express').Router();
const multer = require('multer');
const { Listing } = require('../db/models');

const upload = multer({ dest: 'public/uploads/' });

router.get('/', (req, res) => {
  res.render('upload/uploadModel');
});

router.post('/', upload.single('Photo-1'), (req, res, next) => {
  const { path } = req.file;
  const newPath = path.slice(6);
  const listing = Listing.create({
    name: req.body.name, description: req.body.description, price: req.body.price, sku: 'ABC', modelLink: 'link', modelImage: newPath, user_id: req.session.userId,
  });
  res.redirect('/');
});

module.exports = router;
