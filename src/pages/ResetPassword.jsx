import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ResetPassword() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const email = searchParams.get('email');
	const [newPassword, setNewPassword] = useState('');
	const [requestSuccessful, setRequestSuccessful] = useState(false);

	const changePassword = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				'https://eventbooking-go-9c6c8d14446d.herokuapp.com/api/reset-password',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						token: token,
						new_password: newPassword,
					}),
				}
			);
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				toast.success(data.message);
				setRequestSuccessful(true);
			} else {
				console.log(data);
				toast.error(data.error);
			}
		} catch (error) {
			console.log(error);
			toast.error(error);
		}
	};

	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
					{requestSuccessful ? (
						<div className="card-body">
							<p className="text-green-500">Password changed successfully.</p>
						</div>
					) : (
						<form className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text">New Password</span>
								</label>
								<input
									type="password"
									placeholder="Enter your new password"
									className="input input-bordered"
									onChange={(e) => setNewPassword(e.target.value)}
									value={newPassword}
									required
								/>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary" onClick={changePassword}>
									Change Password
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
