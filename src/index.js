import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';

import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
 
inject();
injectSpeedInsights()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

