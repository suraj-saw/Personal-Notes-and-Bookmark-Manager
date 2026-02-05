import { useState, useEffect } from 'react';

export default function NoteForm({ note, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    isFavorite: false,
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        tags: note.tags ? note.tags.join(', ') : '',
        isFavorite: note.isFavorite || false,
      });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    
    onSubmit({
      ...formData,
      tags: tagsArray,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="Enter note title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="6"
          className="input-field resize-none"
          placeholder="Enter note content"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="input-field"
          placeholder="work, personal, ideas"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isFavorite"
          checked={formData.isFavorite}
          onChange={handleChange}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Mark as favorite
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {note ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
