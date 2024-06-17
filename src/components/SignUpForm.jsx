import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function SignUpForm({ switchForm }) {
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
						<form className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Username</span>
								</label>
								<input
									type="text"
									placeholder="username"
									className="input input-bordered"
									required
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
