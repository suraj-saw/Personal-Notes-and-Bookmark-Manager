const Bookmark = require('../models/Bookmark');
const { fetchUrlMetadata } = require('../utils/urlMetadata');

const normalizeUrl = (value) => {
  if (!value) return value;
  return value.startsWith('http://') || value.startsWith('https://')
    ? value
    : `https://${value}`;
};

// @desc    Get all bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
  try {
    const { q, tags } = req.query;
    let query = { user: req.user._id };

    // Search by text
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single bookmark
// @route   GET /api/bookmarks/:id
// @access  Private
const getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    // Check user ownership
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this bookmark' });
    }

    res.json(bookmark);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new bookmark
// @route   POST /api/bookmarks
// @access  Private
const createBookmark = async (req, res) => {
  try {
    let { url, title, description, tags, isFavorite } = req.body;

    // Validation
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    url = normalizeUrl(url);

    // Auto-fetch title if not provided (Bonus feature)
    if (!title || title.trim() === '') {
      const metadata = await fetchUrlMetadata(url);
      if (metadata.success && metadata.title) {
        title = metadata.title;
      } else {
        title = url; // Fallback to URL as title
      }
    }

    const bookmark = await Bookmark.create({
      url,
      title,
      description: description || '',
      tags: tags || [],
      isFavorite: isFavorite || false,
      user: req.user._id
    });

    res.status(201).json(bookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update bookmark
// @route   PUT /api/bookmarks/:id
// @access  Private
const updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    // Check user ownership
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this bookmark' });
    }

    let { url, title, description, tags, isFavorite } = req.body;

    if (url) {
      url = normalizeUrl(url);
    }

    bookmark.url = url !== undefined ? url : bookmark.url;
    bookmark.title = title !== undefined ? title : bookmark.title;
    bookmark.description = description !== undefined ? description : bookmark.description;
    bookmark.tags = tags !== undefined ? tags : bookmark.tags;
    bookmark.isFavorite = isFavorite !== undefined ? isFavorite : bookmark.isFavorite;

    const updatedBookmark = await bookmark.save();
    res.json(updatedBookmark);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    // Check user ownership
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this bookmark' });
    }

    await bookmark.deleteOne();
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark
};
