import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';
import { FiFileText, FiBookmark } from 'react-icons/fi';

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/notes');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Notes & Bookmark Manager
        </h1>
        <p className="text-gray-600 mb-8">
          Organize your thoughts and favorite links in one place
        </p>
        <div className="flex space-x-4 justify-center">
          <Link href="/notes" className="btn-primary inline-flex items-center space-x-2">
            <FiFileText />
            <span>Notes</span>
          </Link>
          <Link href="/bookmarks" className="btn-primary inline-flex items-center space-x-2">
            <FiBookmark />
            <span>Bookmarks</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
