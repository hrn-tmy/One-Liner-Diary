import { Link } from "react-router-dom";

export default function Top() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-800">
          One Liner Diary
        </h1>
        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 rounded-full bg-white text-gray-800 border border-gray-300 shadow-sm hover:bg-gray-50 transition"
          >
            Sign Up
          </Link>
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
