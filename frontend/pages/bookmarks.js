import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import BookmarkCard from '../components/BookmarkCard';
import BookmarkForm from '../components/BookmarkForm';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import api from '../utils/api';
import { FiPlus } from 'react-icons/fi';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async (q = '', tags = '') => {
    try {
      const params = {};
      if (q) params.q = q;
      if (tags) params.tags = tags;
      
      const { data } = await api.get('/bookmarks', { params });
      setBookmarks(data);
      setFilteredBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchBookmarks(query, tagFilter);
  };

  const handleTagFilter = (tags) => {
    setTagFilter(tags);
    fetchBookmarks(searchQuery, tags);
  };

  const handleCreateBookmark = async (bookmarkData) => {
    try {
      await api.post('/bookmarks', bookmarkData);
      setIsModalOpen(false);
      fetchBookmarks(searchQuery, tagFilter);
    } catch (error) {
      console.error('Error creating bookmark:', error);
      alert(error.response?.data?.message || 'Failed to create bookmark');
    }
  };

  const handleUpdateBookmark = async (bookmarkData) => {
    try {
      await api.put(`/bookmarks/${editingBookmark._id}`, bookmarkData);
      setIsModalOpen(false);
      setEditingBookmark(null);
      fetchBookmarks(searchQuery, tagFilter);
    } catch (error) {
      console.error('Error updating bookmark:', error);
      alert(error.response?.data?.message || 'Failed to update bookmark');
    }
  };

  const handleDeleteBookmark = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await api.delete(`/bookmarks/${id}`);
        fetchBookmarks(searchQuery, tagFilter);
      } catch (error) {
        console.error('Error deleting bookmark:', error);
        alert(error.response?.data?.message || 'Failed to delete bookmark');
      }
    }
  };

  const handleToggleFavorite = async (bookmark) => {
    try {
      await api.put(`/bookmarks/${bookmark._id}`, {
        ...bookmark,
        isFavorite: !bookmark.isFavorite,
      });
      fetchBookmarks(searchQuery, tagFilter);
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  const openEditModal = (bookmark) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBookmark(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Bookmarks</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <FiPlus />
              <span>New Bookmark</span>
            </button>
          </div>

          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              onTagFilter={handleTagFilter}
              placeholder="Search bookmarks..."
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredBookmarks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery || tagFilter
                  ? 'No bookmarks found matching your search'
                  : 'No bookmarks yet. Add your first bookmark!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark._id}
                  bookmark={bookmark}
                  onEdit={openEditModal}
                  onDelete={handleDeleteBookmark}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingBookmark ? 'Edit Bookmark' : 'Create New Bookmark'}
        >
          <BookmarkForm
            bookmark={editingBookmark}
            onSubmit={editingBookmark ? handleUpdateBookmark : handleCreateBookmark}
            onCancel={closeModal}
          />
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
