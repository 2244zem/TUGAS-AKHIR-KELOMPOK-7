export default function CategoryCard({ category, darkMode }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="relative">
        <img
          src={category.image?.trim() || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={category.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          #{category.id}
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
          {category.name}
        </h2>
        <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <span className="font-medium">Slug:</span> {category.slug}
        </p>
        <div className={`mt-3 w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            style={{ width: `${(category.id % 10) * 10}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}