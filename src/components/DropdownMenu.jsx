import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function DropdownMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleContainer = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				toggleContainer.current &&
				!toggleContainer.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}

		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={toggleContainer}>
			<button
				className="btn btn-accent bg-secondary"
				onClick={() => setIsOpen(!isOpen)}
			>
				Manage account/events
			</button>
			{isOpen && (
				<div
					style={{
						backgroundColor: 'black',
						border: '1px solid #ddd',
						padding: '10px',
						color: 'white',
					}}
				>
					<ul>
						<Link to="create-event">
							<li>Create event</li>
						</Link>
						<li>See your events</li>
						<li>Manage account</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default DropdownMenu;
