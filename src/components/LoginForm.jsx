import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function LoginForm({ switchForm }) {
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
						<form className="card-body">
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
							<input
								type="file"
								className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
							/>
						</form>
						<div className="btn btn-success btn-outline w-4 h-4">Button</div>
					</div>
				</div>
			</div>
		</>
	);
}

LoginForm.propTypes = {
	switchForm: PropTypes.func.isRequired,
};
