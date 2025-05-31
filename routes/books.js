const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/bookController');
const authenticateToken = require('../middleware/auth');

router.get('/', bookCtrl.getAllBooks);
router.get('/isbn/:isbn', bookCtrl.getByISBN);
router.get('/author/:author', bookCtrl.getByAuthor);
router.get('/title/:title', bookCtrl.getByTitle);
router.get('/review/:isbn', bookCtrl.getReviews);

router.put('/review/:isbn', authenticateToken, bookCtrl.addOrUpdateReview);
router.delete('/review/:isbn', authenticateToken, bookCtrl.deleteReview);

module.exports = router;