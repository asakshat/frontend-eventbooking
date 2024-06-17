import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export default function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);

	const handleSwitch = () => {
		setIsLogin(!isLogin);
	};

	return (
		<>
			{isLogin ? (
				<LoginForm switchForm={handleSwitch} />
			) : (
				<SignUpForm switchForm={handleSwitch} />
			)}
		</>
	);
}
