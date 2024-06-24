import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function GoogleMapInt({ lat, lng, address }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const containerStyle = {
        width: '1200px',
        height: '150px'
    };

    const center = {
        lat: lat || 0,
        lng: lng || 0
    };

    const [zoomLevel, setZoomLevel] = useState(13); // Initial zoom level

    return (
        <div>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoomLevel}
                >
                    {/* Ensure Google Maps API is loaded before using the Marker */}
                    {lat && lng && <Marker position={{ lat, lng }} />}
                </GoogleMap>
            </LoadScript>
            {address && (
                <p>
                    {address.streetName} {address.streetNumber}
                    <br />
                    {address.city} {address.zipCode} {address.country}
                </p>
            )}
        </div>
    );
}

export default GoogleMapInt;