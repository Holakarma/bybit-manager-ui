import { SnackbarProvider } from 'notistack';
import { Providers } from './providers';
import { Router } from './router';
import './styles/App.scss';

function App() {
	// @FIXME: remove SnackbarProvider from here
	return (
		<Providers>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={6000}
			>
				<Router />
			</SnackbarProvider>
		</Providers>
	);
}

export default App;
