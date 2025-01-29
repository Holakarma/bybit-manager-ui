import { createTheme } from '@mui/material';
import typography, { mapping } from './typography';
import darkPalette from './dark-palette';

const componentsStyles = {
	MuiTypography: {
		defaultProps: {
			variantMapping: {
				...mapping,
			},
		},
	},
	MuiButton: {
		defaultProps: {
			disableElevation: true,
		},
		styleOverrides: {
			root: {
				padding: '8px 16px',
				textTransform: 'none',
				borderRadius: 8,
				fontWeight: 400,
			},
			outlined: {
				color: 'white',
			},
		},
	},
	MuiDataGrid: {
		styleOverrides: {
			root: {
				'& .MuiDataGrid-container--top  [role="row"]': {
					background: 'none',
				},
			},
		},
	},
};

const paletteStyles = {
	mode: 'dark',
	...darkPalette,
};

const darkTheme = createTheme({
	// @TODO: transfer colors from figma
	// MUI palette docs: (https://mui.com/material-ui/customization/dark-mode/)

	palette: {
		...paletteStyles,
	},
	typography: {
		...typography,
	},
	components: {
		...componentsStyles,
	},
});

export default darkTheme;
