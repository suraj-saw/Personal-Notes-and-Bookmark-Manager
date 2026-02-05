const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarkController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getBookmarks)
  .post(createBookmark);

router.route('/:id')
  .get(getBookmarkById)
  .put(updateBookmark)
  .delete(deleteBookmark);

module.exports = router;
