import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="fw-bold">⭐ Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p className="mt-3">No favorites yet. Start adding some!</p>
      ) : (
        <div className="row mt-4">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 overflow-hidden">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{recipe.title}</h5>
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-primary me-2">
                    View Details
                  </Link>
                  <button className="btn btn-danger" onClick={() => removeFromFavorites(recipe.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
