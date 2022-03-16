const router = require('express').Router();
const { Listing } = require('../db/models')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })


router.get('/', (req, res) => {
    res.render('upload/uploadModel')
})

router.post('/', upload.single('Photo-1'), function (req, res, next) {
    const path = req.file.path
    const newPath = path.slice(6)
    const listing = Listing.create({'name': req.body.name, 'description': req.body.description, 'price': req.body.price, 'sku': 'ABC', 'modelLink': 'link', 'modelImage': newPath, 'user_id': req.session.userId})
    res.redirect('/')
  })

router.get('/model', async (req, res) => {
    let targetListings = await Listing.findAll({where: {user_id: '2'}, raw: true})
    res.render('upload/test', {targetListings})
})

module.exports = router