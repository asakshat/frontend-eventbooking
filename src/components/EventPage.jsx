import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom"
import GoogleMapInt from './GoogleMapInt';
import EventDirections from './EventDirections';



function EventPage() {
    
    const [showDirections, setShowDirections] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation()
    const event = location.state || {} 
    // console.log(event);
    // console.log(event.Organizer.username);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
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
                console.error('No coordinates found for this address.');
                return { lat: null, lng: null };
            }
        } catch (error) {
            console.error('Error fetching geocode:', error);
            return { lat: null, lng: null };
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        const fetchURL = import.meta.env.VITE_FETCH_URL;
        console.log(event.ID, firstname, lastname, email);
        try {
            const response = await fetch(`${fetchURL}/api/ticket/${event.ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    first_name: firstname,
                    last_name:lastname,
                    email: email
                }),
                
            });
            if (response.ok) {
                console.log('Booking successful');
            } else {
                console.error('Booking failed');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    }

    useEffect(() => {
        getCoordinates();
    },[]);

    return (
        <div className='flex'>
            {!showDirections && 
            <div className='flex-row' data-theme='cyberpunk'>
                <div>
                <img className='h-72 w-full' src={event.ImageURL} alt="" />
                </div>
                <div className='info'>
                    <p>{event.Title} {event.Organizer.username}</p>
                    <p>{formatDate(event.Date)} {event.Time}</p>
                    <p>{event.Location}</p>
                    <p>{event.Venue} {event.Price}€</p>
                    <p>{event.Description}</p>
                    <button className='btn btn-primary w-20'
                    onClick={()=> setShowBooking(true)}>Book now</button>
                    
                    {showBooking && 
                    <form >
                        <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit" onClick={handleBooking} className='btn btn-primary w-20'>Book Now</button>
                    </form>}

                    <button className='btn btn-primary w-20'
                     onClick={()=> setShowDirections(true)}>Get Directions</button>
                    
                </div>
                <GoogleMapInt lat={coordinates.lat} lng={coordinates.lng} address={event.Location} />
            </div> }
                {showDirections && 
                <div>
                    <EventDirections coordinates={coordinates} />
                    <button className='btn btn-primary w-20'
                    onClick={()=> setShowDirections(false)}>Back to event</button>
                </div>}
        </div>
    ) 
}

export default EventPage