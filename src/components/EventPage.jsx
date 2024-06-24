import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GoogleMapInt from "./GoogleMapInt";
import EventDirections from "./EventDirections";

function EventPage() {
  const [showDirections, setShowDirections] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const location = useLocation();
  const event = location.state || {};
  console.log(event);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getCoordinates = async () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const encodedAddress = encodeURIComponent(event.Location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates({ lat: location.lat, lng: location.lng });
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error("No coordinates found for this address.");
        return { lat: null, lng: null };
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return { lat: null, lng: null };
    }
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  return (
    <div className="flex min-h-screen">
      {!showDirections && (
        <div className="flex-row w-full" data-theme="cyberpunk">
          <div>
            <img
              className="h-72 w-full object-cover"
              src={event.ImageURL}
              alt=""
            />
          </div>
          <div className="info p-4">
            <p className="text-xl font-bold">
              {event.Title} - {event.Organizer.Username}
            </p>
            <p className="text-md">
              {formatDate(event.Date)} {event.Time}
            </p>
            <p className="text-md truncate">{event.Location}</p>
            <p className="text-md">
              {event.Venue} {event.Price}€
            </p>
            <p className="text-md">{event.Description}</p>
            <div className="mt-4">
              <button className="btn btn-primary w-20 mr-2">Book Now</button>
              <button
                className="btn btn-primary w-20"
                onClick={() => setShowDirections(true)}
              >
                Get Directions
              </button>
            </div>
          </div>
          <GoogleMapInt
            lat={coordinates.lat}
            lng={coordinates.lng}
            address={event.Location}
          />
        </div>
      )}
      {showDirections && (
        <div>
          <EventDirections coordinates={coordinates} />
          <button
            className="btn btn-primary w-20"
            onClick={() => setShowDirections(false)}
          >
            Back to event
          </button>
        </div>
      )}
    </div>
  );
}

export default EventPage;
