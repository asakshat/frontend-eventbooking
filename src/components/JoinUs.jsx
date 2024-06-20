import React from "react";
import { useNavigate } from "react-router-dom";

const JoinUs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-base-100 ">
      <div className="w-2/5 h-screen">
        <img
          src="https://images.lifestyleasia.com/wp-content/uploads/sites/3/2022/04/07111030/tijs-van-leur-Qnlp3FCO2vc-unsplash-scaled.jpg"
          className="w-full h-full object-cover"
          alt="Event"
        />
      </div>
      <div className="flex flex-col justify-center items-end w-3/5 p-10">
        <h1 className="font-bold text-6xl md:text-8xl text-right mb-8">JOIN US</h1>
        <p className="mt-4 text-right  md:text-2xl font-bold">
          <span className="font-bold">Ready</span> to{" "}
          <span className="text-primary font-bold">effortlessly</span> post and
          host events? <br />
          You've come to the right place!
        </p>
        <p className="mt-4 text-right text-xl md:text-2xl font-bold">
          Publish your events, specify every detail, showcase captivating photos
          and offer your guests a
          <span className="text-secondary font-bold"> smooth</span> experience
          with just a few clicks.
        </p>
        <p className="mt-4 text-right text-xl md:text-2xl font-bold">
          <span className="font-bold text-primary">Join us today</span> and start sharing
          your events with the world!
        </p>
        <div className="mt-8">
          <button
            className="btn btn-primary dark:btn-secondary text-2xl font-bold"
            onClick={() => navigate("/auth")}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
