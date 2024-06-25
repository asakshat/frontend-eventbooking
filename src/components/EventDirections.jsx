import React, { useState } from 'react';
import {
	GoogleMap,
	LoadScript,
	DirectionsRenderer,
} from '@react-google-maps/api';

function EventDirections({ coordinates }) {
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const [directions, setDirections] = useState(null);
	const [departPoint, setDepartPoint] = useState({
		streetName: '',
		city: '',
		zipCode: '',
		country: '',
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

	return (
		<div className="flex flex-col items-center">
			<form className="event-creator" data-theme="cyberpunk">
				<label>
					Street:
					<input
						type="text"
						name="streetName"
						value={departPoint.streetName}
						onChange={handleChange}
					/>
				</label>
				<label>
					Zip Code:
					<input
						type="text"
						className="w-11"
						name="zipCode"
						value={departPoint.zipCode}
						onChange={handleChange}
					/>
				</label>
				<label>
					City:
					<input
						type="text"
						name="city"
						value={departPoint.city}
						onChange={handleChange}
					/>
				</label>
				<label>
					Country:
					<input
						type="text"
						name="country"
						value={departPoint.country}
						onChange={handleChange}
					/>
				</label>

				<button
					type="submit"
					className="btn btn-primary w-20"
					onClick={(e) => handleSubmit(e, 'DRIVING')}
				>
					By Car
				</button>

				<button
					type="submit"
					className="btn btn-primary w-20"
					onClick={(e) => handleSubmit(e, 'WALKING')}
				>
					Walking
				</button>

				<button
					type="submit"
					className="btn btn-primary w-20"
					onClick={(e) => handleSubmit(e, 'TRANSIT')}
				>
					Public Transport
				</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<LoadScript googleMapsApiKey={apiKey}>
				<GoogleMap
					zoom={10}
					mapContainerStyle={{ width: '100%', height: '400px' }}
					center={coordinates}
				>
					{directions && <DirectionsRenderer directions={directions} />}
				</GoogleMap>
			</LoadScript>
		</div>
	);
}

export default EventDirections;
