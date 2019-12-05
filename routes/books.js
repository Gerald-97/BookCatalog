var express = require('express');
var router = express.Router();
var book = require('../controller/bookControl')
var token = require('../middleware/token')

router.post('/add', book.createBook);

router.get('/all', book.allBooks);

router.get('/:id', book.bookEntry);

router.put('/:id', token, book.updateBook);

router.delete('/:id', token, book.deleteBook);

module.exports = router;
