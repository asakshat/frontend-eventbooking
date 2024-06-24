import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

function EventDirections({ coordinates }) {
    
    console.log(coordinates);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const [directions, setDirections] = useState(null);
    const [departPoint, setDepartPoint] = useState({
        streetNumber: '',
        streetName: '',
        city: '',
        zipCode: '',
        country: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartPoint((prevDepartPoint) => ({
            ...prevDepartPoint,
            [name]: value
        }));
    };

    const calculateDirections = (method) => {
        const fullAddress = `${departPoint.streetNumber} ${departPoint.streetName}, ${departPoint.city}, ${departPoint.zipCode}, ${departPoint.country}`;
        const encodedAddress = encodeURIComponent(fullAddress);
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    const origin = { lat: location.lat, lng: location.lng };
                    getDirections(origin, method);
                } else {
                    setError('No coordinates found for this address.');
                }
            })
            .catch(error => {
                setError('Error fetching geocode: ' + error.message);
            });
    };

    const getDirections = (origin, method) => {
        const directionsService = new window.google.maps.DirectionsService();
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

    const handleSubmit = (method) => {
        calculateDirections(method);
    };

    return (
        <div className='flex min-h-screen'>
            <form method="post" className="event-creator" data-theme="cyberpunk" onSubmit={(e) => e.preventDefault()}>
                <label>
                    Street:
                    <input type="text" name="streetName" value={departPoint.streetName} onChange={handleChange} />
                </label>
                <label>
                    N°:
                    <input type="number" className="w-11" name="streetNumber" value={departPoint.streetNumber} onChange={handleChange} />
                </label>
                <label>
                    Zip Code:
                    <input type="text" className="w-11" name="zipCode" value={departPoint.zipCode} onChange={handleChange} />
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={departPoint.city} onChange={handleChange} />
                </label>
                <label>
                    Country:
                    <input type="text" name="country" value={departPoint.country} onChange={handleChange} />
                </label>
                
                <button type="button" className="btn btn-primary w-20"
                onClick={() => handleSubmit('DRIVING')}>By Car</button>
                
                <button type="button" className="btn btn-primary w-20"
                onClick={() => handleSubmit('WALKING')}>Walking</button>
                
                <button type="button" className="btn btn-primary w-20"
                onClick={() => handleSubmit('TRANSIT')}>Public Transport</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    zoom={10}
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default EventDirections;
