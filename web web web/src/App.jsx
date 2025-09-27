import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryCard from "./components/CategoryCard";

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // ✅ URL diperbaiki: tanpa spasi!
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filtered = categories
    .filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "id") return a.id - b.id;
      return a.name.localeCompare(b.name);
    });

  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-indigo-50 to-blue-100"}`}>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500 border-b-transparent rounded-full animate-spin animation-delay-300 opacity-70"></div>
        </div>
        <p className={`mt-6 text-xl font-medium ${darkMode ? "text-gray-300" : "text-blue-700"}`}>
          Loading categories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col justify-center items-center h-screen ${darkMode ? "bg-gray-900" : "bg-red-50"}`}>
        <div className="text-5xl mb-4 animate-bounce">⚠️</div>
        <p className={`text-lg font-semibold text-center px-6 max-w-md ${darkMode ? "text-red-400" : "text-red-600"}`}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800"} min-h-screen p-4 sm:p-6 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto">
        {/* Header dengan gaya modern */}
        <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        {/* Search & Sort */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          darkMode={darkMode}
        />

        {/* Grid Kategori */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              No categories found for "{search}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {filtered.map((cat) => (
              <CategoryCard key={cat.id} category={cat} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;