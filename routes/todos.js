var express = require('express');
var router = express.Router();
var models = require('../models/index')
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.Todo.findAll({})
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }


});

router.post('/', async function (req, res, next) {
  try {
    const { title, UserId } = req.body
    const data = await models.Todo.create({ title, UserId })
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { title, complete } = req.body
    const data = await models.Todo.update({
        title,
        complete: JSON.parse(complete)
    }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(new Response(data[1]? data[1] : data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});
router.delete('/:id', async function (req, res, next) {
  try {
    const data = await models.Todo.destroy({
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
