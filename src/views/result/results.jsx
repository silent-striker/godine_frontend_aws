import React, { useEffect, useState } from "react";
import "./results.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import axios, { isAxiosError } from "axios";

const Results = () => {
  const server_url =
    process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  const restaurantid = (id) => {
    navigate(`/reserve/${id}`);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const headers = {
        "Content-Type": "application/json",
      }
      const response = await axios.get(`${server_url}/restaurants/search`, { headers: headers });
      if (isAxiosError(response)) {
        console.log("response: ", response);
      }
      const data = response.data;
      setRestaurants(data);
    };

    fetchRestaurants().catch(console.error);
  }, []);

  return (
    <div className="container cb">
      <section className="restaurant-list">
        <h1 className="text-center">Restaurants</h1>
        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="col-sm-4 my-5"
              onClick={() => console.log("Restaurant Id:", restaurant.id)}
            >
              <div className="card mb-3">
                <img
                  src={
                    restaurant.photos[0] || "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt={restaurant.restaurantName}
                />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.restaurantName}</h5>
                  <p className="m-0">
                    Location: {restaurant.restaurantAddress}
                  </p>
                  <p className="m-0">Cuisine: {restaurant.cuisine}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => restaurantid(restaurant.id)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Results;
