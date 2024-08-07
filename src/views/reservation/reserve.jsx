import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./reserve.css";
import useAuth from "../../hooks/useAuth";
import axios, { isAxiosError } from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useParams } from "react-router-dom";

const Reserve = () => {
  const { getUserId, getAuthData } = useAuth();
  const cancelRequestRef = useRef(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const userId = getUserId();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const server_url =
      process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
    const restaurant_endpoint = `restaurants/fetch/${id}`;

    const endpoint = `${server_url}/${restaurant_endpoint}`;

    cancelRequestRef.current?.abort();
    cancelRequestRef.current = new AbortController();
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios
          .get(endpoint, {
            signal: cancelRequestRef.current?.signal,
            headers: headers,
          })

        if (isAxiosError(response)) {
          console.log("response: ", response);
          return;
        }

        setRestaurantData(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    fetchData();
  }, []);
  let pics = [];
  let menupics = [];
  if (restaurantData) {
    const {
      features,
      restaurantName,
      restaurantAddress,
      pricing,
      cuisine,
      operatingHours,
      contactNumber,
      seatingCapacity,
      Payment,
      menu,
      photos,
    } = restaurantData;
    pics = photos;
    menupics = menu;
  }

  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleShow = (imgSrc) => {
    setSelectedImg(imgSrc);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const respics = pics.map((pics) => {
    return (
      <Carousel.Item>
        <img className="d-block w-100" src={pics} alt="Resturant images" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    );
  });

  // submission of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: e.target.emailInput.value,
        phone: e.target.phoneInput.value,
        date: e.target.dateInput.value,
        time: e.target.timeInput.value,
        guests: parseInt(e.target.guests.value),
      };
      const reservationData = {
        restaurantId: id,
        userId: userId,
        reservationDate: formData.date,
        reservationTime: formData.time,
        noOfGuests: formData.guests,
      };
      const server_url =
        process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
      const restaurant_endpoint = "reservation/create";

      const accessToken = JSON.parse(sessionStorage.getItem("user")).accessToken;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `${accessToken}`,
      };
      const endpoint = `${server_url}/${restaurant_endpoint}`;

      const response = await axios
        .post(endpoint, reservationData, {
          signal: cancelRequestRef.current?.signal,
          headers: headers,
        })
        .then((response) => response)
        .catch((err) => { throw err });

      navigate("/history");
      alert("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      if (isAxiosError(error)) {
        if (error.response.status === 400) {
          alert("Please provide all required fields.");
        } else if (
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          alert("Please login to create a reservation.");
          // navigate("/signin", {state: {from: location}, replace: true});
        }
        return;
      }
      alert("Error creating reservation. Please try again.");
    }
  };
  return (
    <div className="pcontainer container ">
      <div className="row">
        <div className="col-md-6">
          <Card className="card-reserve">
            <Card.Body className="cbody">
              <Carousel className=" border-bottom">{respics}</Carousel>
              <div className="d-flex">
                {menupics.map((menupics, index) => (
                  <img
                    key={1}
                    className="menu mx-3"
                    src={menupics}
                    alt={`Slide ${index + 1}`}
                    onClick={() => handleShow(menupics)}
                  />
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="cfooter d-flex-column text-white">
              <div className="d-flex border-bottom ">
                {restaurantData && (
                  <h3 className="col-10 my-2">
                    {restaurantData.restaurantName}
                  </h3>
                )}
              </div>

              <div className=" container my-4">
                {restaurantData && (
                  <p>
                    {" "}
                    <b>Address: </b>
                    {restaurantData.restaurantAddress}
                  </p>
                )}
                {restaurantData && (
                  <p>
                    {" "}
                    <b>Phone:</b> {restaurantData.contactNumber}
                  </p>
                )}
                {restaurantData && (
                  <p>
                    {" "}
                    <b>Operating Hours:</b> {restaurantData.operatingHours}
                  </p>
                )}
                {restaurantData && (
                  <p>
                    {" "}
                    <b>Seating Capacity:</b> {restaurantData.seatingCapacity}
                  </p>
                )}
                {restaurantData && (
                  <p>
                    {" "}
                    <b>Cuisine: </b>
                    {restaurantData.cuisine}
                  </p>
                )}
                {restaurantData && (
                  <p>
                    {" "}
                    <b>Pricing:</b> {restaurantData.pricing}
                  </p>
                )}
              </div>
              {/* <div className="col-4 text-center m-auto">
                                    <button className="btn btn-primary">Menu</button>
                                    <button className="btn btn-primary">Review</button>
                                    <button className="btn btn-primary">Overview</button>
                                </div> */}
            </Card.Footer>
          </Card>
        </div>
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Body>
            <img src={selectedImg} className="w-100" alt="Menu" />
          </Modal.Body>
        </Modal>
        <div className="col-6">
          <form className="m-5 fcontainer " onSubmit={handleSubmit}>
            <h4 className="text-center text-capitalize">
              <b>Reservation Form</b>
            </h4>
            <hr />
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
              <input
                type="email"
                className="form-control control-p "
                id="emailInput"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput">Phone</label>
              <input
                type="number"
                className="form-control control-p "
                id="phoneInput"
                placeholder="Enter phone"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateInput">Date</label>
              <input
                type="date"
                className="form-control control-p  text-center"
                id="dateInput"
                placeholder="Enter date"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeInput">Time</label>
              <input
                type="time"
                className="form-control control-p  text-center"
                id="timeInput"
                placeholder="Enter time"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guestsInput">Number of guests (max 5)</label>
              <div className="dropdown">
                <select
                  class="form-select text-center"
                  id="guests"
                  aria-label="Example select with button addon"
                  required
                >
                  <option selected>None</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                </select>
              </div>
            </div>
            <div className="m-5 text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserve;