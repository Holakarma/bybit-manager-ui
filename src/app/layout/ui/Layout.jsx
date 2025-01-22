import { Box, Stack } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { FallbackComponent } from 'shared/ui/fallback';
import { Navigation } from 'widgets/navigation';

const Layout = () => {
	return (
		<Stack
			direction="row"
			minHeight="100vh"
			alignItems="сenter"
		>
			<Box
				component="aside"
				height="100vh"
			>
				<Navigation />
			</Box>
			<Box
				flexGrow={1}
				p={4}
			>
				<Suspense fallback={<FallbackComponent />}>
					<Outlet />
				</Suspense>
			</Box>
		</Stack>
	);
};

export default Layout;
