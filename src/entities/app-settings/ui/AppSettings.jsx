import { yupResolver } from '@hookform/resolvers/yup';
import {
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Modal,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import LicenseInfo from 'entities/license/@X/app-settings/LicenseInfo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAppConfig, setAppConfig } from 'shared/model/app-config';
import {
	API_CONFIG_NAME,
	TASK_SETTINGS_CONFIG_NAME,
	VERIFY_ATTEMPTS_CONFIG_NAME,
} from 'shared/model/app-config/consts';
import { ModalBody, ModalBodyBackground } from 'shared/ui/modal-body';
import schema, { defaultConfig } from '../model/schema';
import ApiSettings from './ApiSettings';
import CaptchaSelect from './CaptchaSelect';
import TaskSettings from './TaskSettings';
import VerifyingSettings from './VerifyingSettings';

const AppSettings = ({ children, tooltipTitle, ...props }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
        watch,
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: getAppConfig() || defaultConfig,
        mode: 'onChange',
    });

    const saveHandle = async (data) => {
        setAppConfig(data);
        reset(data);
    };

    const resetHandle = () => {
        setAppConfig(defaultConfig);
        reset(defaultConfig);
    };

    return (
        <>
            <Tooltip
                title={tooltipTitle}
                placement="right"
            >
                <Button
                    {...props}
                    onClick={handleOpen}
                    variant="outlined"
                    color="secondary"
                >
                    {children || 'Settings'}
                </Button>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <ModalBody>
                    <ModalBodyBackground sx={{ overflow: 'auto' }}>
                        <Typography
                            variant="H5"
                            marginBottom={4}
                        >
                            App Settings
                        </Typography>

                        <form onSubmit={handleSubmit(saveHandle)}>
                            <Stack
                                gap={4}
                                flexGrow={1}
                                overflow="auto"
                            >
                                <Stack
                                    flexGrow={1}
                                    gap={3}
                                >
                                    <LicenseInfo />
                                    <Divider />

                                    <TaskSettings
                                        control={control}
                                        watch={watch}
                                        name={TASK_SETTINGS_CONFIG_NAME}
                                        errors={
                                            errors[TASK_SETTINGS_CONFIG_NAME]
                                        }
                                        trigger={trigger}
                                    />

                                    <List
                                        subheader={
                                            <ListSubheader>
                                                API settings
                                            </ListSubheader>
                                        }
                                    >
                                        <ListItem>
                                            <CaptchaSelect
                                                control={control}
                                                name="captchaType"
                                                error={!!errors.captchaType}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <VerifyingSettings
                                                control={control}
                                                name={
                                                    VERIFY_ATTEMPTS_CONFIG_NAME
                                                }
                                                emailError={
                                                    !!errors.verifyAttempts
                                                        ?.email
                                                }
                                                totpError={
                                                    !!errors.verifyAttempts
                                                        ?.totp
                                                }
                                                emailHelperText={
                                                    errors.verifyAttempts?.email
                                                        ?.message
                                                }
                                                totpHelperText={
                                                    errors.verifyAttempts?.totp
                                                        ?.message
                                                }
                                            />
                                        </ListItem>
                                        <ListItem
                                            sx={{
                                                flexDirection: 'column',
                                                alignItems: 'end',
                                                // gap: 1,
                                            }}
                                        >
                                            <ApiSettings
                                                control={control}
                                                errors={errors[API_CONFIG_NAME]}
                                            />
                                            <ListItemText secondary="*need reload to confirm" />
                                        </ListItem>
                                    </List>
                                </Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Button onClick={resetHandle}>Reset</Button>

                                {isDirty ? (
                                    <Button
                                        type="submit"
                                        disabled={
                                            !isDirty ||
                                            Boolean(Object.keys(errors).length)
                                        }
                                        sx={{ minWidth: 125 }}
                                        variant="outlined"
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        disabled={Boolean(
                                            Object.keys(errors).length,
                                        )}
                                        onClick={() => location.reload()}
                                    >
                                        Reload page
                                    </Button>
                                )}
                            </Stack>
                        </form>
                    </ModalBodyBackground>
                </ModalBody>
            </Modal>
        </>
    );
};

export default AppSettings;
