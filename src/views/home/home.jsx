import React from "react";
import "./home.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <div className="hcontainer">
      <div className="bg1">
        <div className="container-sm hs">
          <div className="m-5 p-5 hs1">
            <p className="quote text-center" style={{ fontSize: "3vw" }}>
              “One cannot think well, love well, sleep well, if one has not
              dined well.”{" "}
            </p>
          </div>
        </div>
      </div>

      <section>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Button variant="warning" onClick={handleSubmit}>
                  View all Restaurants
                </Button>
              </div>
              <div className="col-md-3 my-3 ">
                <div
                  className="card border  border-3 border-warning rounded-lg shadow-lg type"
                >
                  <div className="card-body  d-flex flex-row">
                    <div>
                      <h5 className="card-title">Buffet</h5>
                      <p className="card-text">
                        Enjoy a wide variety of dishes. With no limitations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                  >
                    <div>
                      <h5 className="card-title">Pure Veg</h5>
                      <p className="card-text">
                        Experience the best vegetarian cuisine from around your
                        beauriful city.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                  >
                    <div>
                      <h5 className="card-title">Must Visit</h5>
                      <p className="card-text">
                        Discover the must-visit restaurants in our city at a
                        discounted rate (Special Offer)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                  >
                    <div>
                      <h5 className="card-title">Happy Hours</h5>
                      <p className="card-text">
                        Enjoy your Happy Hours with a beautiful Downtown View at
                        Tawa Grill and other similar restaurants
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                  >
                    <div>
                      <h5 className="card-title">New Restaurants</h5>
                      <p className="card-text">
                        Explore the latest addition of restaurants.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                  >
                    <div>
                      <h5 className="card-title">Meat Fest</h5>
                      <p className="card-text">
                        Experience with a variety of meats at our new place at
                        discounted price.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                  >
                    <div>
                      <h5 className="card-title">Sea Food</h5>
                      <p className="card-text">
                        Treat yourself to Freshly prepared seafood from the
                        ocean at Mehfil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                  >
                    <div>
                      <h5 className="card-title">Vegan</h5>
                      <p className="card-text">
                        Discover the benefits of a plant-based diet with Dhaba
                        Style twist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
