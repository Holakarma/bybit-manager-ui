import { Providers } from './providers';
import './styles/App.scss';
import { Router } from './router';

function App() {
	return (
		<Providers>
			<Router />
		</Providers>
	);
}

export default App;
