import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';
import { ErrorWithIcon } from 'shared/ui/error';
import SetDefaultAccountButton from './SetDefaultAccountButton';

const NoDefaultAccountWarning = (props) => {
	return (
		<ErrorWithIcon
			description="Default account with session is required"
			icon={
				<NoAccountsRoundedIcon
					sx={{
						width: '150px',
						height: '150px',
						fill: 'currentColor',
					}}
				/>
			}
			action={<SetDefaultAccountButton sx={{ marginTop: 2 }} />}
			{...props}
		/>
	);
};

export default NoDefaultAccountWarning;
