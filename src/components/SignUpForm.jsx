import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignUpForm({ switchForm }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const fetchUrl = import.meta.env.VITE_FETCH_URL;
	const navigate = useNavigate();


	const handleSubmit = async () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(`${fetchUrl}/api/signup`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username: username,
						email: email,
						password: password,
					}),
				});
				const data = await response.json();
				console.log(data);
				if (response.status === 200) {
					resolve(data);
					switchForm();
				} else {
					reject(new Error(data.error));
				}
			} catch (error) {
				console.error(error);
				reject(error);
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
						<h1 className="text-5xl font-bold">Sign Up Now !</h1>
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
									<span className="label-text">Username</span>
								</label>
								<input
									type="text"
									placeholder="username"
									className="input input-bordered"
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
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
							</div>
							<label className="label">
								<a
									onClick={switchForm}
									className="label-text-alt link link-hover"
								>
									Already have an account? Login Now!
								</a>
							</label>
							<div className="form-control mt-6">
								<button className="btn btn-primary">Sign Up</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

SignUpForm.propTypes = {
	switchForm: PropTypes.func.isRequired,
};
