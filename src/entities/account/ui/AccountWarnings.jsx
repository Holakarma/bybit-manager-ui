import { Stack, useTheme } from '@mui/material';
import { FramedFace } from 'shared/assets/icons/framed-face';
import { KeyCrossed } from 'shared/assets/icons/key-crossed';
import WARNINGS from '../model/warnings';

const WarningIcon = ({ warning, ...props }) => {
    switch (warning) {
        case WARNINGS.facial:
            return <FramedFace {...props} />;
        case WARNINGS['2fa']:
            return <KeyCrossed {...props} />;
        default:
            return null;
    }
};

const AccountWarnings = ({ warnings }) => {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            alignItems="center"
            height="100%"
            gap={1}
        >
            {warnings?.map((warning, i) => (
                <WarningIcon
                    key={i}
                    warning={warning}
                    size="18"
                    fill={theme.palette.error.main}
                />
            ))}
        </Stack>
    );
};

export default AccountWarnings;
