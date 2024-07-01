import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineLogin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import DropdownMenu from './DropdownMenu';
import { UserContext } from './UserContext';

export default function Navbar() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [allEvents, setAllEvents] = useState([]);

	const navigateToAuthForm = () => {
		navigate('/auth');
	};

	useEffect(() => {
		const fetchURL = import.meta.env.VITE_FETCH_URL;
		fetch(`${fetchURL}/api/event`)
			.then((response) => response.json())
			.then((data) => setAllEvents(data.events || []))
			.catch((error) => console.error('Failed to retrieve data:', error));
	}, []);

	useEffect(() => {
		if (searchTerm) {
			const filteredEvents = allEvents.filter((event) =>
				event.Title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setSuggestions(filteredEvents);
		} else {
			setSuggestions([]);
		}
	}, [searchTerm, allEvents]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSuggestionClick = (eventId) => {
		navigate(`/event/${eventId}`);
		setSearchTerm('');
		setSuggestions([]);
	};

	const userTrunc =
		user && user.user && user.user.Email
			? user.user.Email.split('@')[0].substring(0, 1).toUpperCase()
			: '';

	return (
		<div className="navbar bg-neutral-600 gap-4 relative z-50">
			<div className="flex-1">
				<Link to="/">
					<img
						className="w-24 h-24 p-1 hover:cursor-pointer"
						src={logo}
						alt="Event Booking logo"
					/>
				</Link>
			</div>
			{user && <DropdownMenu />}
			<div className="flex-none gap-2 relative">
				<div className="form-control">
					<input
						type="text"
						placeholder="Search for events"
						className="input input-bordered w-24 md:w-auto"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					{suggestions.length > 0 && (
						<div className="absolute top-full mt-1 w-full bg-white border rounded shadow-lg z-50">
							{suggestions.map((suggestion) => (
								<div
									key={suggestion.ID}
									className="p-2 cursor-pointer hover:bg-gray-200"
									onClick={() => handleSuggestionClick(suggestion.ID)}
								>
									{suggestion.Title}
								</div>
							))}
						</div>
					)}
				</div>
				{userTrunc && (
					<div className="avatar placeholder">
						<div className="bg-neutral text-neutral-content w-14 rounded-full">
							<span className="text-xl">{userTrunc}</span>
						</div>
					</div>
				)}
				<label className="swap swap-rotate">
					<input type="checkbox" className="theme-controller" value="night" />
					{/* SVG icons for theme toggle */}
				</label>
				<div>
					{!user && (
						<button
							onClick={navigateToAuthForm}
							className="btn btn-primary btn-circle"
						>
							<MdOutlineLogin className="w-5 h-5 text-black dark:text-white" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
