import Notistack from '../notistack/Notistack';
import QueryProvider from '../query/ui/QueryClientProvier';
import Theme from '../theme/ui/Theme';

const Providers = ({ children }) => {
	return (
		<Theme>
			<Notistack>
				<QueryProvider>{children}</QueryProvider>
			</Notistack>
		</Theme>
	);
};

export default Providers;
