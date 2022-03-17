const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const nodeMailer = require('../nodeMailer');

router.get('/', (req, res) => {
  res.render('entries/registrationForm');
});

router.post('/new', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const addUser = await User.create({ name, password: hashPassword, email });
    req.session.user = addUser.name;
    req.session.userId = addUser.id;
    req.session.basket = [];

    if (!addUser.name || !addUser.password || !addUser.email) return res.sendStatus(400);

    const message = {
      to: addUser.email,
      subject: 'Congratulations! You are successfully registred on our site',
      html: `
      <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>
      
      <i>данные вашей учетной записи:</i>
      <ul>
          <li>login: ${addUser.name}</li>
          <li>password: ${password}</li>
      </ul>
      <p>Данное письмо не требует ответа.<p>`,
    };

    nodeMailer(message);

    res.json(addUser);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
});
module.exports = router;
