import { Layout } from 'app/layout';
import { ImportPage } from 'pages/import';
import { MainPage } from 'pages/main';
import { NotFoundPage } from 'pages/not-found';
import { createHashRouter, RouterProvider } from 'react-router';
import ROUTES from 'shared/config/routes';

const Router = () => {
	const router = createHashRouter([
		{
			path: ROUTES.MAIN,
			element: <Layout />,
			children: [
				{
					index: true,
					element: <MainPage />,
				},
				{
					path: ROUTES.IMPORT,
					element: <ImportPage />,
				},
				{
					path: ROUTES.NOT_FOUND,
					element: <NotFoundPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
