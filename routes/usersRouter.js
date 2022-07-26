var express = require('express');
var router = express.Router();

const { create,store,update,edit,borrarUser } = require('../controllers/usersController');

/* GET users listing. */
router.get('/register',create)
router.post('/register',store)
router.get('/:id',edit)
router.patch('/:id',update)
router.delete('/delete/:id',borrarUser);




module.exports = router;
