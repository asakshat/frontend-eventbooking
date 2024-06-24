import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginForm({ switchForm }) {
	
	const [responseMessage, setResponseMessage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const fetchUrl = import.meta.env.VITE_FETCH_URL;
	const navigate = useNavigate();

	const handleSubmit = async () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(`${fetchUrl}/api/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
					credentials: 'include',
				});
				const data = await response.json();
				console.log(data);
				setResponseMessage('Login successful');
				if (response.status === 200) {
					navigate('/');
					resolve(data);
				} else {
					reject(new Error(data.error));
				}
			} catch (error) {
				console.error(error);
				reject(error);
				setResponseMessage('Error logging in. Please try again.');
			}
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const promise = handleSubmit(e);
		toast.promise(promise, {
			loading: 'Loading...',
			success: (data) => {
				return `${data.message}`;
			},
			error: (error) => {
				return `${error.message}`;
			},
		});
	};

	return (
		<>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Welcome Back !</h1>
					</div>
					<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<Link
							to="/"
							className="flex bg-base-200 items-center text-primary p-4"
						>
							<IoIosArrowBack className="mr-1" />
							Back to home
						</Link>
						<form className="card-body" onSubmit={handleFormSubmit}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									placeholder="email"
									className="input input-bordered"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="password"
									className="input input-bordered"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label className="label">
									<a
										onClick={switchForm}
										className="label-text-alt link link-hover"
									>
										Dont have an account? Sign Up Now!
									</a>
								</label>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary">Login</button>
							</div>
						</form>
						{/* <Logout/> */}
					</div>
				</div>
			</div>
		</>
	);
}

LoginForm.propTypes = {
	switchForm: PropTypes.func.isRequired,
};
