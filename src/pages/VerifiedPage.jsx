import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function EmailVerification() {
	const [searchParams] = useSearchParams();
	const [verificationStatus, setVerificationStatus] = useState(
		'Verifying your email...'
	);

	useEffect(() => {
		const verifyEmail = async () => {
			const token = searchParams.get('token');
			console.log('Token:', token);
			if (token) {
				try {
					const response = await fetch(
						'http://localhost:9000/api/verify-email',
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

					setVerificationStatus('Email verified successfully.');
				} catch (error) {
					console.error('Verification failed:', error);
					setVerificationStatus('Email verification failed.');
				}
			}
		};

		verifyEmail();
	}, [searchParams]);

	return (
		<div>
			<p>{verificationStatus}</p>
		</div>
	);
}

export default EmailVerification;
