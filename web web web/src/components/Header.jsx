export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600">
        Product Group7
      </h1>
      <button
        onClick={toggleDarkMode}
        className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          darkMode
            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-300 hover:to-orange-300"
            : "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800"
        }`}
      >
        {darkMode ? " Light Mode" : " Dark Mode"}
      </button>
    </header>
  );
}