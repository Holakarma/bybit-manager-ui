import { Providers } from './providers';
import { MainPage } from 'pages/main';
import './styles/App.scss';

function App() {
	return (
		<Providers>
			<MainPage />
		</Providers>
	);
}

export default App;
