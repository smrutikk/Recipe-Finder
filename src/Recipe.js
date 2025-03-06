import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import bg_Image from "./Img/home_bg_img.jpg";
import { Link } from "react-router-dom";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const API_KEY = "aa4ebeeaac3b4aa0b36f4fc59c201bde";

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchRecipes = async (query) => {
    if (!query) return;
    try {
      setError(null);
      const API_URL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${query}&number=10`;
      const response = await axios.get(API_URL);
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again later.");
    }
  };

  const fetchRecipeDetails = async (recipeId) => {
    try {
      const API_URL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=false`;
      const response = await axios.get(API_URL);
      
      console.log("Recipe Details API Response:", response.data); // Debugging
      
      setSelectedRecipe(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      setError("Failed to fetch recipe details.");
    }
  };
  

  const fetchRandomRecipes = async () => {
    try {
      const API_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=3`;
      const response = await axios.get(API_URL);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    }
  };

  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column align-items-center position-relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bg_Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark w-100 bg-transparent fixed-top px-4">
        <a className="navbar-brand fw-bold" href="#">🍽️ Recipe Finder</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/favorites">Favorites</Link></li>
          </ul>
        </div>
      </nav>

      <div className="container mt-5 py-5 text-center">
        <h2 className="fw-bold">Find Your Perfect Recipe 🍳</h2>
        <p>Enter ingredients and discover delicious recipes!</p>
        <input
          type="text"
          className="form-control w-50 mx-auto rounded-pill shadow p-3"
          placeholder="e.g., chicken, tomato"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchRecipes(e.target.value);
          }}
        />
      </div>

      {error && <div className="alert alert-danger w-50 text-center">{error}</div>}

      <div className="container mt-4">
        <h3 className="fw-bold">🍕 Explore Recipes</h3>
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 overflow-hidden">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{recipe.title}</h5>
                  <button className="btn btn-outline-primary me-2" onClick={() => fetchRecipeDetails(recipe.id)}>
                    View Details
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => addToFavorites(recipe)}>
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedRecipe?.title && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ color: "black" }}>
              <div className="modal-header">
                <h5 className="modal-title">{selectedRecipe.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-start">
                <img src={selectedRecipe.image} className="img-fluid rounded mb-3" alt={selectedRecipe.title} />
                <p>⏳ <strong>Cooking Time:</strong> {selectedRecipe.readyInMinutes} mins</p>
                <h6 className="mt-3">🥦 Ingredients:</h6>
                <ul>
                  {selectedRecipe.extendedIngredients?.length > 0 ? (
                    selectedRecipe.extendedIngredients.map((ing) => (
                      <li key={ing.id}>{ing.original}</li>
                    ))
                  ) : (
                    <li>No ingredients available</li>
                  )}
                </ul>
                <h6 className="mt-3">📜 Steps:</h6>
                <ol>
                  {selectedRecipe.analyzedInstructions.length > 0 &&
                  selectedRecipe.analyzedInstructions[0].steps.length > 0 ? (
                    selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))
                  ) : (
                    <li>No steps provided</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecipeFinder;
