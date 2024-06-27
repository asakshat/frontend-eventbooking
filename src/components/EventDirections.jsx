import React, { useState } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	DirectionsRenderer,
} from '@react-google-maps/api';

function EventDirections({ coordinates }) {
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: apiKey,
	});

	const [directions, setDirections] = useState(null);
	const [departPoint, setDepartPoint] = useState({
		streetName: '',
		city: '',
		zipCode: '',
		country: '',
	});

	const fullAddress = `${departPoint.streetName}, ${departPoint.city}, ${departPoint.zipCode}, ${departPoint.country}`;

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
						console.error('Network error:', error.message);
					}
				} else {
					setError('No coordinates found for this address.');
				}
			})
			.catch((error) => {
				setError('Error fetching geocode: ' + error.message);
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
				if (status === 'OK') {
					setDirections(result);
					setError(null);
				} else {
					setError('Directions request failed due to ' + status);
				}
			}
		);
	};

	const handleSubmit = (e, method) => {
		e.preventDefault();
		calculateDirections(method);
	};

	if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading Maps</div>;

	return (
		<div className="flex flex-row justify-evenly items-start">
			<form className="event-creator p-5 bg-white shadow-mg rounded-lg w-1/3 ml-6">
				<label className="block mb-2">
					Street:
					<input
						type="text"
						name="streetName"
						value={departPoint.streetName}
						onChange={handleChange}
						className="block w-full mt-1 p-2 border rounded"
					/>
				</label>
				<label className="block mb-2">
					Zip Code:
					<input
						type="text"
						name="zipCode"
						value={departPoint.zipCode}
						onChange={handleChange}
						className="block w-full mt-1 p-2 border rounded"
					/>
				</label>
				<label className="block mb-2">
					City:
					<input
						type="text"
						name="city"
						value={departPoint.city}
						onChange={handleChange}
						className="block w-full mt-1 p-2 border rounded"
					/>
				</label>
				<label className="block mb-2">
					Country:
					<input
						type="text"
						name="country"
						value={departPoint.country}
						onChange={handleChange}
						className="block w-full mt-1 p-2 border rounded"
					/>
				</label>

				<p className="mb-2">Choose your way of travel:</p>
				<div className="flex gap-4">
					<button
						type="submit"
						className="btn btn-primary"
						onClick={(e) => handleSubmit(e, 'DRIVING')}
					>
						By Car
					</button>
					<button
						type="submit"
						className="btn btn-primary"
						onClick={(e) => handleSubmit(e, 'WALKING')}
					>
						Walking
					</button>
					<button
						type="submit"
						className="btn btn-primary"
						onClick={(e) => handleSubmit(e, 'TRANSIT')}
					>
						Public Transport
					</button>
				</div>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</form>
			<div className="w-2/3">
				<GoogleMap
					zoom={10}
					mapContainerStyle={{
						width: '90%',
						height: '430px',
						marginLeft: '50px',
					}}
					center={coordinates}
				>
					{directions && <DirectionsRenderer directions={directions} />}
				</GoogleMap>
			</div>
		</div>
	);
}

export default EventDirections;
