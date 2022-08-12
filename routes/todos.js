var express = require('express');
var router = express.Router();
var Todo = require('../MongoModels/todo')
var User = require('../MongoModels/user')
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await models.User.findAll({
      include: models.Todo
    })
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
/* GET users listing. */
router.get('/mongo/', async function (req, res, next) {
  try {
    const data = await Todo.find().populate({path: 'user', select: 'name'})
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }


});

router.post('/mongo/', async function (req, res, next) {
  try {
    const { title, UserId } = req.body
    const user = await User.findById(UserId)
    const todo = await Todo.create({ title, user })
    user.todos.push(todo._id)
    await user.save()
    res.json(new Response(todo))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});

router.put('/mongo/:id', async function (req, res, next) {
  try {
    const { title, complete } = req.body
    const data = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        complete
      }, {
      new: true
    })
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});
router.delete('/mongo/:id', async function (req, res, next) {
  try {
    const data = await Todo.findByIdAndRemove(req.params.id)
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }


});
module.exports = router;
