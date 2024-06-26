import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function EmailVerification() {
	const [searchParams] = useSearchParams();
	const [verificationStatus, setVerificationStatus] = useState({
		message: 'Verifying your email... Please wait.',
		type: 'info',
	});

	useEffect(() => {
		const verifyEmail = async () => {
			const token = searchParams.get('token');
			if (token) {
				try {
					const response = await fetch(
						'https://eventbooking-go-9c6c8d14446d.herokuapp.com/api/verify-email',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ token }),
						}
					);
					const data = await response.json();
					console.log('Verification successful:', data);

					setVerificationStatus({
						message:
							'Your email has been successfully verified! Welcome to our community.',
						type: 'success',
					});
				} catch (error) {
					console.error('Verification failed:', error);
					setVerificationStatus({
						message:
							'Oops! Something went wrong during the verification process. Please try again later.',
						type: 'error',
					});
				}
			}
		};

		verifyEmail();
	}, [searchParams]);

	const textColorClass =
		verificationStatus.type === 'success'
			? 'text-green-500'
			: verificationStatus.type === 'error'
			? 'text-red-500'
			: 'text-gray-700';

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<p className={`text-lg font-semibold ${textColorClass}`}>
				{verificationStatus.message}
			</p>
		</div>
	);
}

export default EmailVerification;
