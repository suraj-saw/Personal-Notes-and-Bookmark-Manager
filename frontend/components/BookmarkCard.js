import { FiEdit2, FiTrash2, FiStar, FiExternalLink } from 'react-icons/fi';

export default function BookmarkCard({ bookmark, onEdit, onDelete, onToggleFavorite }) {
  const safeUrl = bookmark.url.startsWith('http') ? bookmark.url : `https://${bookmark.url}`;

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {bookmark.title}
            </h3>
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              <FiExternalLink />
            </a>
          </div>
          <p className="text-sm text-primary-600 mb-2 truncate">{bookmark.url}</p>
          {bookmark.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {bookmark.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onToggleFavorite(bookmark)}
          className="ml-2"
        >
          <FiStar
            className={`w-5 h-5 ${
              bookmark.isFavorite
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-400 hover:text-yellow-400'
            }`}
          />
        </button>
      </div>
      
      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="mb-3">
          {bookmark.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(bookmark)}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
          >
            <FiEdit2 />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
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
