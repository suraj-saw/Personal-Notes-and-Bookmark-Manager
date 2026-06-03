const mongoose = require('mongoose');
const validator = require('validator');

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return validator.isURL(v, {
          require_protocol: true,
          allow_underscores: true
        });
      },
      message: 'Please provide a valid URL'
    }
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  tags: {
    type: [String],
    default: []
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for search functionality
bookmarkSchema.index({ title: 'text', description: 'text' });
bookmarkSchema.index({ tags: 1 });
bookmarkSchema.index({ user: 1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
