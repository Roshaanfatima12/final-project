import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const plants = [
    // Indoor Plants
    { id: 1, name: "Snake Plant", price: 20, category: "Indoor", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Peace Lily", price: 25, category: "Indoor", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Spider Plant", price: 15, category: "Indoor", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Aloe Vera", price: 18, category: "Indoor", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Rubber Plant", price: 30, category: "Indoor", image: "https://via.placeholder.com/150" },
    { id: 6, name: "ZZ Plant", price: 22, category: "Indoor", image: "https://via.placeholder.com/150" },

    // Outdoor Plants
    { id: 7, name: "Rose", price: 12, category: "Outdoor", image: "https://via.placeholder.com/150" },
    { id: 8, name: "Tulip", price: 14, category: "Outdoor", image: "https://via.placeholder.com/150" },
    { id: 9, name: "Sunflower", price: 10, category: "Outdoor", image: "https://via.placeholder.com/150" },
    { id: 10, name: "Daisy", price: 9, category: "Outdoor", image: "https://via.placeholder.com/150" },
    { id: 11, name: "Lavender", price: 16, category: "Outdoor", image: "https://via.placeholder.com/150" },
    { id: 12, name: "Marigold", price: 11, category: "Outdoor", image: "https://via.placeholder.com/150" },

    // Succulents
    { id: 13, name: "Cactus", price: 8, category: "Succulents", image: "https://via.placeholder.com/150" },
    { id: 14, name: "Echeveria", price: 10, category: "Succulents", image: "https://via.placeholder.com/150" },
    { id: 15, name: "Jade Plant", price: 12, category: "Succulents", image: "https://via.placeholder.com/150" },
    { id: 16, name: "Haworthia", price: 9, category: "Succulents", image: "https://via.placeholder.com/150" },
    { id: 17, name: "Agave", price: 14, category: "Succulents", image: "https://via.placeholder.com/150" },
    { id: 18, name: "Sedum", price: 11, category: "Succulents", image: "https://via.placeholder.com/150" },
  ];

  const categories = ["Indoor", "Outdoor", "Succulents"];

  const isInCart = (id) => {
    return cartItems.find((item) => item.id === id);
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px", background: "#4CAF50", color: "white" }}>
        <h2>Paradise Nursery</h2>
        <div>
          <Link to="/" style={{ margin: "10px", color: "white" }}>Home</Link>
          <Link to="/plants" style={{ margin: "10px", color: "white" }}>Plants</Link>
          <Link to="/cart" style={{ margin: "10px", color: "white" }}>
            Cart ({cartItems.length})
          </Link>
        </div>
      </nav>

      {/* Products */}
      {categories.map((category) => (
        <div key={category} style={{ padding: "20px" }}>
          <h2>{category} Plants</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <div key={plant.id} style={{ border: "1px solid #ccc", padding: "15px", width: "200px", textAlign: "center" }}>
                  <img src={plant.image} alt={plant.name} width="100%" />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>

                  <button
                    onClick={() => dispatch(addToCart(plant))}
                    disabled={isInCart(plant.id)}
                    style={{
                      background: isInCart(plant.id) ? "gray" : "green",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {isInCart(plant.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
