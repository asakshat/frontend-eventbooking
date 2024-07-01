import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2022/04/07111030/tijs-van-leur-Qnlp3FCO2vc-unsplash-scaled.jpg",
  "https://s3-ap-southeast-2.amazonaws.com/ish-oncourse-scc/85edf77e-03d4-4d37-8171-130776d6d4d2?versionId=CyqL4UCaGm9Ld.YzcsTqQah7LpCs.E2m",
  "https://liquidcapitalcorp.com/wp-content/uploads/2018/04/Prepare-for-a-conference.jpg",
  "https://static01.nyt.com/images/2017/09/20/business/21ebiz1/21ebiz1-superJumbo.jpg",
  "https://www.loghicconnect.com.au/wp-content/uploads/2020/05/Untitled-design-2023-03-16T112342.403.jpg",
  "https://www.johntalk.com/wp-content/uploads/2018/06/The-Benefits-of-Working-Music-Festivals.jpg",
  "https://www.nevadaart.org/wp-content/uploads/2018/11/2018_GalleryShot_AlteredLandscape1.jpg",
  "https://www.walksinsiderome.com/wp-content/uploads/2023/01/italian-cooking-class-in-rome.jpg",
  "https://www.johntalk.com/wp-content/uploads/2018/06/The-Benefits-of-Working-Music-Festivals.jpg",
];

const JoinUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-base-100 ">
      <div className="w-2/5 h-screen relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: index === currentImageIndex ? 10 : 1,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-end w-3/5 p-10">
        <h1 className="font-bold text-6xl md:text-8xl text-right mb-6">
          JOIN US
        </h1>
        <div className="p-4 bg-white shadow-mg rounded-lg">
          <p className="mt-4 mr-4 text-right  md:text-2xl font-bold">
            <span className="font-bold">Ready</span> to{" "}
            <span className="text-primary font-bold">effortlessly</span> post
            and host events? <br />
            You've come to the right place!
          </p>
          <p className="mt-4 mr-4 text-right text-xl md:text-2xl font-bold">
            Publish your events, specify every detail, showcase captivating
            photos and offer your guests a
            <span className="text-secondary font-bold"> smooth</span> experience
            with just a few clicks.
          </p>
          <p className="mt-4 mb-4 mr-4 text-right text-xl md:text-2xl font-bold">
            <span className="font-bold text-primary">Join us today</span> and
            start sharing your events with the world!
          </p>
        </div>
        <div className="mt-6">
          <button
            className="btn btn-primary dark:btn-secondary text-2xl font-bold "
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
