// pages/CategoryDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryDetail({ darkMode }) {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

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
    <div className={`p-6 ${darkMode ? "bg-gray-900" : "bg-blue-50"}`}>
      <Link
        to="/"
        className={`inline-block mb-6 px-4 py-2 rounded-lg ${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-blue-200 text-blue-800 hover:bg-blue-300"
        } transition`}
      >
        ← Back to Categories
      </Link>

      <div className={`max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <img
          src={category.image || "https://via.placeholder.com/200"}
          alt={category.name}
          className="w-full h-48 object-cover rounded-xl mb-4 border-2 border-blue-100"
        />
        <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
        <p className="text-sm text-gray-500 mb-1">ID: {category.id}</p>
        <p className="text-xs text-gray-400 mb-1">Slug: {category.slug}</p>
        <p className="text-xs text-gray-500 mt-4">
          Created: {new Date(category.creationAt).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">
          Updated: {new Date(category.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default CategoryDetail;