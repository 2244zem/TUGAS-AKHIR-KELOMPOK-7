// pages/Home.jsx
import React, { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";

function Home({ darkMode, setDarkMode }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
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
      <div className={`flex justify-center items-center h-screen ${darkMode ? "bg-gray-900" : "bg-blue-50"}`}>
        <p className={`text-xl font-semibold ${darkMode ? "text-white" : "text-blue-700"}`}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex justify-center items-center h-screen ${darkMode ? "bg-gray-900" : "bg-red-50"}`}>
        <p className={`text-xl font-semibold ${darkMode ? "text-red-400" : "text-red-600"}`}>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <SearchBar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        darkMode={darkMode}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.map((cat) => (
          <CategoryCard key={cat.id} category={cat} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

export default Home;