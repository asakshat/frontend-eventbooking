import Navbar from './components/Navbar';
function App() {
	const skeletonDivs = [];
	for (let i = 0; i < 3; i++) {
		skeletonDivs.push(
			<div className="flex flex-col gap-4 w-52" key={i}>
				<div className="skeleton h-32 w-full"></div>
				<div className="skeleton h-4 w-28"></div>
				<div className="skeleton h-4 w-full"></div>
				<div className="skeleton h-4 w-full"></div>
			</div>
		);
	}
	return (
		<>
			<Navbar />
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content text-center">{skeletonDivs}</div>
			</div>
		</>
	);
}

export default App;
