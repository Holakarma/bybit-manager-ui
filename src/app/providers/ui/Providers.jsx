import QueryProvider from '../query/ui/QueryClientProvier';
import Theme from '../theme/ui/Theme';

const Providers = ({ children }) => {
	return (
		<Theme>
			<QueryProvider>{children}</QueryProvider>
		</Theme>
	);
};

export default Providers;
