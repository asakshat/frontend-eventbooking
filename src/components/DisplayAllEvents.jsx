import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DisplayAllEvents() {
    const [events, setEvents] = useState(null);
    const navigate = useNavigate();
    
    async function getEventList() {
        try {
            const fetchURL = import.meta.env.VITE_FETCH_URL;
            const response = await fetch(`${fetchURL}/api/event`)
            const data = await response.json()
            setEvents(data)
            // console.log(data)
        } catch (error) {
            console.error('Failed to retrieve data:', error)
        }
    }
    
    useEffect(() => {
        getEventList()
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
    <div className='flex gap-9 flex-wrap '>
        {events && events.events.map(event => (
        <div key={event.ID} className='w-64 justify-center'>
            <div className='image'>
                <img src={event.ImageURL} alt="" />
            </div>
            <div className="info">
                <p>{event.Title} {event.Organizer?.Username}</p>
                <p>{formatDate(event.Date)} {event.Time}</p>
                <p>{event.Location}</p>
                <p>{event.Venue} {event.Price}€</p>
                <div className="flex gap-2">
                    <Link to={`/event/${event.ID}`} state={event}>
                        <button className='btn btn-primary w-20'>See Event</button>
                    </Link>
                    <Link to={`/edit-event/${event.ID}`} state={event}>
                        <button className='btn btn-primary w-20'>Modify Event</button>
                    </Link>
                </div>
            </div>
        </div>
        ))}
    </div>
    );
}

export default DisplayAllEvents;
