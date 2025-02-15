import { styled } from '@mui/material';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
	({ theme }) => ({
		'&.notistack-MuiContent-success': {
			backgroundColor: theme.palette.success.main,
			color: theme.palette.text.primary, // Цвет текста для success
		},
		'&.notistack-MuiContent-error': {
			backgroundColor: theme.palette.error.main,
			color: theme.palette.text.primary, // Цвет текста для error
		},
		'&.notistack-MuiContent-warning': {
			backgroundColor: theme.palette.warning.main,
			color: theme.palette.warning.contrastText, // Цвет текста для warning
		},
		'&.notistack-MuiContent-info': {
			backgroundColor: theme.palette.info.main,
			color: theme.palette.text.primary, // Цвет текста для info
		},
	}),
);
const Notistack = ({ children }) => {
	return (
		<SnackbarProvider
			maxSnack={3}
			autoHideDuration={6000}
			Components={{
				success: StyledMaterialDesignContent,
				error: StyledMaterialDesignContent,
				warning: StyledMaterialDesignContent,
				info: StyledMaterialDesignContent,
			}}
		>
			{children}
		</SnackbarProvider>
	);
};

export default Notistack;
