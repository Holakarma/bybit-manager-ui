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

	MuiTooltip: {
		defaultProps: {
			disableInteractive: true,
			PopperProps: {
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, -14],
						},
					},
				],
			},
		},
		styleOverrides: {
			// tooltip: {
			// 	backgroundColor: '#333', // Пример стиля для Tooltip
			// 	fontSize: '0.875rem', // Размер шрифта
			// 	borderRadius: 8, // Закругление углов
			// },
			// arrow: {
			// 	color: '#333', // Цвет стрелки Tooltip
			// },
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
