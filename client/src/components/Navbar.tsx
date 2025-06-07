import { Link } from 'react-router-dom';
import { NeuroIcon } from '../icons/NeuroIcon';

export function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-sky-600 h-10 w-10">
            <NeuroIcon />
          </div>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">
            NeuroNote
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/signin"
            className="px-4 py-2 rounded-lg hover:bg-sky-100 text-sky-700 font-medium transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-lg hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
