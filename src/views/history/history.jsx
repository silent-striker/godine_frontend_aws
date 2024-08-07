import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import "./history.css";
import useAuth from "../../hooks/useAuth";

const History = () => {
  const { getUserId } = useAuth();

  const userId = getUserId();

  const [data, setData] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);

  const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      const historyUrl = `${server_url}/reservation/fetch/${userId}`;
      const restaurantsUrl = `${server_url}/restaurants/search`;
      try {
        const accessToken = JSON.parse(sessionStorage.getItem("user")).accessToken;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        }
        const [reservationsResponse, restaurantsResponse] = await Promise.all([
          axios.get(historyUrl, { headers: headers }),
          axios.get(restaurantsUrl, { headers: headers }),
        ]);
        setData(reservationsResponse.data);
        setRestaurantDetails(restaurantsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleCancel = async (userId, reservationId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (isConfirmed) {
      try {
        const accessToken = JSON.parse(sessionStorage.getItem("user")).accessToken;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        }
        const payload = {
          userId: userId,
          reservationId: reservationId
        };
        const cancelUrl = `${server_url}/reservation/cancel`;
        const response = await axios.put(cancelUrl, payload, { headers: headers });
        if (isAxiosError(response)) {
          console.log("response: ", response);
          throw response.error;
        }

        const cancelledReservation = response.data;
        const updatedReservations = data.map((reservation) => {
          if (reservation.reservationId === cancelledReservation.reservationId) {
            return cancelledReservation;
          }
          return reservation;
        });

        setData(updatedReservations);
      } catch (error) {
        console.error("Failed to delete the reservation:", error);
      }
    } else {
      console.log("Reservation cancellation aborted by the user.");
    }
  };

  return (
    <div className="container cb bp">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Restaurant name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item, index) => {
              const formattedDate = new Date(item.reservationDate).toLocaleDateString("en-US");
              const formattedTime = item.reservationTime;

              return (
                <tr
                  key={index}
                  className={
                    item.reservationStatus === "CONFIRMED"
                      ? "table-success"
                      : item.reservationStatus === "PENDING"
                        ? "table-primary"
                        : "table-light-blue"
                  }
                >
                  <td>{index + 1}</td>
                  <td>
                    {
                      restaurantDetails.find(
                        (rest) => rest.id === item.restaurantId
                      )?.restaurantName
                    }
                  </td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                  <td>{item.reservationStatus}</td>
                  <td>
                    {
                      item.reservationStatus !== "CANCELLED" && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleCancel(getUserId(), item.reservationId)}
                        >
                          Cancel
                        </button>
                      )
                    }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default History;
