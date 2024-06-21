import { Link } from 'react-router-dom';
export default function Error404() {
	return (
		<div className='flex-col min-h-screen bg-base-100'>
			<h1 className="font-mono font-bold">Error 404: Page Doesnt Exists </h1>
			<Link to="/" className="text-blue-500">
				Go back to Home
			</Link>
		</div>
	);
}

