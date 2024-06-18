import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Event Booking</h1>
          <p className="py-6">
            {" "}
            Discover exciting opportunities and stay connected with the latest
            happenings.
          </p>
          <button className="btn btn-primary">Events</button>
          <button className="btn btn-primary">Join Us</button>
          <button className="btn btn-primary">About Us</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
