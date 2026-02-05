const Note = require('../models/Note');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  try {
    const { q, tags } = req.query;
    let query = { user: req.user._id };

    // Search by text
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check user ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this note' });
    }

    res.json(note);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  try {
    const { title, content, tags, isFavorite } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      isFavorite: isFavorite || false,
      user: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check user ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }

    const { title, content, tags, isFavorite } = req.body;

    note.title = title !== undefined ? title : note.title;
    note.content = content !== undefined ? content : note.content;
    note.tags = tags !== undefined ? tags : note.tags;
    note.isFavorite = isFavorite !== undefined ? isFavorite : note.isFavorite;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check user ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};
