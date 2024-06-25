import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

function EventDirections({ coordinates }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [directions, setDirections] = useState(null);
  const [departPoint, setDepartPoint] = useState({
    streetName: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const fullAddress = ` ${departPoint.streetName}, ${departPoint.city}, ${departPoint.zipCode}, ${departPoint.country}`;

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartPoint((prevDepartPoint) => ({
      ...prevDepartPoint,
      [name]: value,
    }));
  };

  const calculateDirections = (method) => {
    const encodedAddress = encodeURIComponent(fullAddress);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          const origin = { lat: location.lat, lng: location.lng };
          try {
            const directionsService =
              new window.google.maps.DirectionsService();
            getDirections(origin, method, directionsService);
          } catch (error) {
            console.error("Network error:", error.message);
          }
        } else {
          setError("No coordinates found for this address.");
        }
      })
      .catch((error) => {
        setError("Error fetching geocode: " + error.message);
      });
  };

  const getDirections = (origin, method, directionsService) => {
    directionsService.route(
      {
        origin,
        destination: { lat: coordinates.lat, lng: coordinates.lng },
        travelMode: method,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          setError(null);
        } else {
          setError("Directions request failed due to " + status);
        }
      }
    );
  };

  const handleSubmit = (e, method) => {
    e.preventDefault();
    calculateDirections(method);
  };


    <div className="flex flex-row items-start space-x-4">
      <form className="event-creator space-y-4 ml-5">
        <label className="block">
          Street: {""}

          <input
            type="text"
            name="streetName"
            value={departPoint.streetName}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label className="block">
          Zip Code: {""}
          <input
            type="text"
            name="zipCode"
            value={departPoint.zipCode}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label className="block">
          City: {""}
          <input
            type="text"
            name="city"
            value={departPoint.city}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label className="block">
          Country: {""}
          <input
            type="text"
            name="country"
            value={departPoint.country}
            onChange={handleChange}
            className="input"
          />
        </label>
        <br />
        <p>Choose your way of travel: </p>
        <div className="space-x-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e, "DRIVING")}
          >
            By Car
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e, "WALKING")}
          >
            Walking
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e, "TRANSIT")}
          > 
            Public Transport
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}

      </form>
      <div className="w-2/3 h-96">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            zoom={10}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              marginLeft: "20px",
            }}
            center={coordinates}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default EventDirections;
