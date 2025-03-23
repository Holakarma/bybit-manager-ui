import { createTheme } from '@mui/material';
import darkPalette from './dark-palette';
import typography, { mapping } from './typography';

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
				variants: [
					{
						props: { variant: 'unstyled' },
						style: {
							padding: 0,
						},
					},
				],
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
	MuiPopper: {
		styleOverrides: {
			root: {
				'& .MuiDataGrid-columnsManagementFooter .MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd':
					{
						display: 'none',
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

// Условное применение disableRipple через тему
// darkTheme.components.MuiButton.defaultProps.disableRipple = (props) =>
// props.variant === 'unstyled';

export default darkTheme;
