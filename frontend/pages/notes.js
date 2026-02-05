import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import api from '../utils/api';
import { FiPlus } from 'react-icons/fi';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (q = '', tags = '') => {
    try {
      const params = {};
      if (q) params.q = q;
      if (tags) params.tags = tags;
      
      const { data } = await api.get('/notes', { params });
      setNotes(data);
      setFilteredNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchNotes(query, tagFilter);
  };

  const handleTagFilter = (tags) => {
    setTagFilter(tags);
    fetchNotes(searchQuery, tags);
  };

  const handleCreateNote = async (noteData) => {
    try {
      await api.post('/notes', noteData);
      setIsModalOpen(false);
      fetchNotes(searchQuery, tagFilter);
    } catch (error) {
      console.error('Error creating note:', error);
      alert(error.response?.data?.message || 'Failed to create note');
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await api.put(`/notes/${editingNote._id}`, noteData);
      setIsModalOpen(false);
      setEditingNote(null);
      fetchNotes(searchQuery, tagFilter);
    } catch (error) {
      console.error('Error updating note:', error);
      alert(error.response?.data?.message || 'Failed to update note');
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        fetchNotes(searchQuery, tagFilter);
      } catch (error) {
        console.error('Error deleting note:', error);
        alert(error.response?.data?.message || 'Failed to delete note');
      }
    }
  };

  const handleToggleFavorite = async (note) => {
    try {
      await api.put(`/notes/${note._id}`, {
        ...note,
        isFavorite: !note.isFavorite,
      });
      fetchNotes(searchQuery, tagFilter);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <FiPlus />
              <span>New Note</span>
            </button>
          </div>

          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              onTagFilter={handleTagFilter}
              placeholder="Search notes..."
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery || tagFilter
                  ? 'No notes found matching your search'
                  : 'No notes yet. Create your first note!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={openEditModal}
                  onDelete={handleDeleteNote}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingNote ? 'Edit Note' : 'Create New Note'}
        >
          <NoteForm
            note={editingNote}
            onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={closeModal}
          />
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
