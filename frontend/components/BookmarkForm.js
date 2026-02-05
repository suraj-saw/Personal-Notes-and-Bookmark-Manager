import { useState, useEffect } from 'react';

export default function BookmarkForm({ bookmark, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    tags: '',
    isFavorite: false,
  });

  useEffect(() => {
    if (bookmark) {
      setFormData({
        url: bookmark.url,
        title: bookmark.title,
        description: bookmark.description || '',
        tags: bookmark.tags ? bookmark.tags.join(', ') : '',
        isFavorite: bookmark.isFavorite || false,
      });
    }
  }, [bookmark]);

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
          URL *
        </label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Leave empty to auto-fetch from URL"
        />
        <p className="text-xs text-gray-500 mt-1">
          If left empty, we'll try to fetch the title automatically
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="input-field resize-none"
          placeholder="Optional description"
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
          placeholder="articles, tools, resources"
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
          {bookmark ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
