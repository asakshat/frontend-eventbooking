import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Homepage = () => {
	const navigate = useNavigate();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<div className="flex flex-col justify-center w-full md:w-3/5 p-4 md:p-10">
				<h1 className="text-2xl md:text-3xl font-bold">Event Booking</h1>
				<p className="text-xl md:text-2xl font-bold py-5 md:py-10">
					Discover exciting opportunities and stay connected with the latest
					happenings.
				</p>
				<div className="flex flex-col space-y-4">
					<button
						className="btn btn-secondary dark:btn-primary"
						onClick={() => navigate('/events')}
					>
						Events
					</button>
					<button
						className="btn btn-primary dark:btn-secondary"
						onClick={() => navigate('/join')}
					>
						Join Us
					</button>
					<button
						className="btn bg-neutral-500"
						onClick={() => navigate('/about')}
					>
						About Us
					</button>
				</div>
			</div>

			<div className="w-full md:w-2/5 h-64 md:h-screen relative">
				{images.map((image, index) => (
					<div
						key={index}
						className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
							index === currentImageIndex ? 'opacity-100' : 'opacity-0'
						}`}
						style={{
							backgroundImage: `url(${image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							zIndex: index === currentImageIndex ? 10 : 1,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Homepage;
