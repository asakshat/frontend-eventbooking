import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DisplayAllEvents() {
    const [events, setEvents] = useState(null);
    
    async function getEventList() {
        try {
            const fetchURL = import.meta.env.VITE_FETCH_URL;
            const response = await fetch(`${fetchURL}/api/event`)
            const data = await response.json()
            setEvents(data)
            console.log(data)
        } catch (error) {
            console.error('Failed to retrieve data:', error)
        }
    }
    
    useEffect(() => {
        getEventList()
    }, [])

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
        <div key={event.id} className='w-64 justify-center' data-theme='cyberpunk'>
            <div className='image'>
                <img src={event.ImageURL} alt="" />
            </div>
            <div className="info">
                <p>{event.Title}</p>
                <p>{formatDate(event.Date)}{event.Time}</p>
                <p>{event.Location}</p>
                <p>{event.Venue}</p>
                <div>
                    <Link to={`/event/${event.id}`} state={event}>
                    <button className='btn btn-primary w-20'>See Event</button>
                    </Link>
                </div>
            </div>
        </div>
        ))}
    </div>
    )
}
    


export default DisplayAllEvents
