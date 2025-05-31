const books = require('../data/books.json');
const reviews = require('../reviews.json');
const fs = require('fs');

exports.getAllBooks = (req, res) => res.json(books);

exports.getByISBN = (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
};

exports.getByAuthor = (req, res) => {
  const results = books.filter(b => b.author.toLowerCase().includes(req.params.author.toLowerCase()));
  res.json(results);
};

exports.getByTitle = (req, res) => {
  const results = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
  res.json(results);
};

exports.getReviews = (req, res) => {
  const bookReviews = reviews[req.params.isbn] || [];
  res.json(bookReviews);
};

exports.addOrUpdateReview = (req, res) => {
  const { review } = req.body;
  const { isbn } = req.params;
  const username = req.user.username;

  if (!reviews[isbn]) reviews[isbn] = [];

  const existing = reviews[isbn].find(r => r.username === username);
  if (existing) {
    existing.review = review;
  } else {
    reviews[isbn].push({ username, review });
  }

  fs.writeFileSync('reviews.json', JSON.stringify(reviews, null, 2));
  res.json({ message: 'Review saved' });
};

exports.deleteReview = (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  if (!reviews[isbn]) return res.status(404).json({ message: 'No reviews found' });

  reviews[isbn] = reviews[isbn].filter(r => r.username !== username);
  fs.writeFileSync('reviews.json', JSON.stringify(reviews, null, 2));

  res.json({ message: 'Review deleted' });
};