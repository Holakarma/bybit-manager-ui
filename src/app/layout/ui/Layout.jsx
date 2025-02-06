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
			justifyContent="center"
			overflow="hidden"
		>
			<Box
				component="aside"
				height="100vh"
			>
				<Navigation />
			</Box>
			<Stack
				p={4}
				overflow="hidden"
				sx={{
					backgroundColor: 'background.default',
				}}
				flexGrow={1}
				maxHeight="100vh"
			>
				<Suspense fallback={<FallbackComponent />}>
					<Outlet />
				</Suspense>
			</Stack>
		</Stack>
	);
};

export default Layout;
