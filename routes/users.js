var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.User.findAll({})
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }


});

router.post('/', async function (req, res, next) {
  try {
    const { username, name } = req.body
    const data = await models.User.create({ username, name })
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { username, name } = req.body
    const data = await models.User.update({
      username,
      name
    }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(new Response(data[1]))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});
router.delete('/:id', async function (req, res, next) {
  try {
    const data = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(data, data ? true : false))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }


});
module.exports = router;
