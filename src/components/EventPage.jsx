import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GoogleMapInt from "./GoogleMapInt";
import EventDirections from "./EventDirections";

function EventPage() {
  const [showDirections, setShowDirections] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const location = useLocation();
  const event = location.state || {};

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
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-hidden">
        <div
          className="h-80 bg-cover bg-top"
          style={{ backgroundImage: `url(${event.ImageURL})` }}
        ></div>
        <div className="max-w-screen-xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">
              {event.Title} - {event.Organizer.Username}
            </h1>
            <p className="text-lg mb-2">
              <strong>Date & Time: </strong>
              {formatDate(event.Date)} at {event.Time}
            </p>
            <p className="text-lg mb-2">
              <strong>Location: </strong>
              {event.Location}
            </p>
            <p className="text-lg mb-2">
              <strong>Venue: </strong>
              {event.Venue}
            </p>
            <p className="text-lg mb-2">
              <strong>Price: </strong>
              {event.Price}€
            </p>
            <p className="text-lg mb-4">
              <strong>Description: </strong>
              {event.Description}
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary w-32">Book Now</button>
              <button
                className="btn btn-secondary w-32"
                onClick={() => setShowDirections(true)}
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDirections && (
        <div className="flex items-center justify-center bg-black bg-opacity-75 text-white m-20">
          <EventDirections coordinates={coordinates} />
          <button
            className="btn btn-secondary mt-6"
            onClick={() => setShowDirections(false)}
          >
            Back to Event
          </button>
        </div>
      )}
      <div className=" flex w-full justify-center">
        <GoogleMapInt
          lat={coordinates.lat}
          lng={coordinates.lng}
          address={event.Location}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default EventPage;
