import React, { useState, useEffect } from "react";


const images = [
  'https://images.lifestyleasia.com/wp-content/uploads/sites/3/2022/04/07111030/tijs-van-leur-Qnlp3FCO2vc-unsplash-scaled.jpg',
  'https://s3-ap-southeast-2.amazonaws.com/ish-oncourse-scc/85edf77e-03d4-4d37-8171-130776d6d4d2?versionId=CyqL4UCaGm9Ld.YzcsTqQah7LpCs.E2m',
  'https://liquidcapitalcorp.com/wp-content/uploads/2018/04/Prepare-for-a-conference.jpg',
  'https://static01.nyt.com/images/2017/09/20/business/21ebiz1/21ebiz1-superJumbo.jpg',
  'https://www.loghicconnect.com.au/wp-content/uploads/2020/05/Untitled-design-2023-03-16T112342.403.jpg',
  'https://www.johntalk.com/wp-content/uploads/2018/06/The-Benefits-of-Working-Music-Festivals.jpg',
  'https://www.nevadaart.org/wp-content/uploads/2018/11/2018_GalleryShot_AlteredLandscape1.jpg',
  'https://www.walksinsiderome.com/wp-content/uploads/2023/01/italian-cooking-class-in-rome.jpg',
  'https://www.johntalk.com/wp-content/uploads/2018/06/The-Benefits-of-Working-Music-Festivals.jpg',
];

const AboutUs = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-3/5 p-10 ">
        <h1 className="text-8xl font-bold mb-10">ABOUT US</h1>
        <p className="mt-4 text-xl md:text-2xl font-bold text-left">
          Something about this project? <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc laoreet
          dictum condimentum. Pellentesque sollicitudin risus elementum ipsum
          aliquet, ut tristique sapien ullamcorper. Vivamus at nisl eget nisl
          vehicula iaculis vel sit amet sapien. Integer vel dolor sed dui
          feugiat tristique ac at eros. Aenean a ultrices libero. Cras tempus
          lorem ac enim semper, in ultricies ex mollis. Pellentesque vel massa
          molestie, aliquam elit ut, ultrices libero.
        </p>
      </div>

      {/* Right side with background image slideshow */}
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
    </div>
  );
};

export default AboutUs;
