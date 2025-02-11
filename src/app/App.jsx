import { Providers } from './providers';
import { Router } from './router';
import './styles/App.scss';

function App() {
	return (
		<Providers>
			<Router />
		</Providers>
	);
}

export default App;
