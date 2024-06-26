import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [requestSuccessful, setRequestSuccessful] = useState(false);

	const submitEmail = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${import.meta.env.VITE_FETCH_URL}/api/forgot-password`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				}
			);
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				toast.success(data.message);
				setRequestSuccessful(true);
			} else {
				toast.error(data.error);
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred. Please try again.');
		}
	};

	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
					<Link
						to="/"
						className="flex bg-base-200 items-center text-primary p-4"
					>
						<IoIosArrowBack className="mr-1" />
						Back to home
					</Link>
					{requestSuccessful ? (
						<div className="card-body">
							<p className="text-green-500">
								Request accepted, please check your email.
							</p>
						</div>
					) : (
						<form className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Type the email for password reset!
									</span>
								</label>
								<input
									type="email"
									placeholder="Enter email address"
									className="input input-bordered"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									required
								/>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary" onClick={submitEmail}>
									Send Reset Request
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
