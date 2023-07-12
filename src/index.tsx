import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { TemporalData } from './const';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App
			offersCount={TemporalData.offersCount}
		/>
	</React.StrictMode>
);
