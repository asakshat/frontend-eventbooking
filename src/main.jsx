import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AuthForm from './pages/AuthForm.jsx';
import Error404 from './components/Error404.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error404 />,
	},
	{
		path: '/auth',
		element: <AuthForm />,
		errorElement: <Error404 />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />{' '}
	</React.StrictMode>
);
