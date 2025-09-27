export default function SearchBar({ search, setSearch, sortBy, setSortBy, darkMode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="🔍 Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-4 pl-12 rounded-2xl border focus:outline-none focus:ring-4 transition-all ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/50"
              : "bg-white border-gray-200 text-gray-800 focus:ring-blue-300/50"
          } shadow-sm hover:shadow-md`}
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setSortBy("name")}
          className={`px-5 py-3 rounded-2xl font-medium transition-all transform hover:scale-105 active:scale-95 ${
            sortBy === "name"
              ? darkMode
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-blue-500 text-white shadow-lg"
              : darkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100 shadow"
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("id")}
          className={`px-5 py-3 rounded-2xl font-medium transition-all transform hover:scale-105 active:scale-95 ${
            sortBy === "id"
              ? darkMode
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-blue-500 text-white shadow-lg"
              : darkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100 shadow"
          }`}
        >
          ID
        </button>
      </div>
    </div>
  );
}