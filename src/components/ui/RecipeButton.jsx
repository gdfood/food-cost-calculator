const RecipeButton = ({ name, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg border transition-colors ${
      isSelected ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-50"
    }`}
  >
    {name}
  </button>
);

export default RecipeButton;