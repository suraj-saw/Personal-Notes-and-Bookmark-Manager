import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';

export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {note.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{note.content}</p>
        </div>
        <button
          onClick={() => onToggleFavorite(note)}
          className="ml-2"
        >
          <FiStar
            className={`w-5 h-5 ${
              note.isFavorite
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-400 hover:text-yellow-400'
            }`}
          />
        </button>
      </div>
      
      {note.tags && note.tags.length > 0 && (
        <div className="mb-3">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
          >
            <FiEdit2 />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
          >
            <FiTrash2 />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
