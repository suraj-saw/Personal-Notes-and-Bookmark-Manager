import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
import { FiLogOut, FiBookmark, FiFileText } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary-600">
              Notes & Bookmarks
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/notes"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/notes'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiFileText />
                <span>Notes</span>
              </Link>
              <Link
                href="/bookmarks"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/bookmarks'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiBookmark />
                <span>Bookmarks</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
