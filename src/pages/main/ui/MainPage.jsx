import {
	Grid2,
	Paper,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
// import * as curlconverter from 'curlconverter';
// import parseCurl from 'parse-curl'; // Работает, но в GET
import { DefaultAccount, SelectedAccounts } from 'entities/account';
import { CustomRequest } from 'features/custom-request';
import { Disable2fa } from 'features/disable-2fa';
import { Enable2fa } from 'features/enable-2fa';
import { ExportAccounts } from 'features/export-accounts';
import { Login } from 'features/login';
import { Logout } from 'features/logout';
import { Refresh } from 'features/refresh-balances';
import { Register } from 'features/register';
import { UpdateProfile } from 'features/update-profile';
import { DollarIcon } from 'shared/assets/icons/dollar';
import { RegisterIcon } from 'shared/assets/icons/register';
import { ShieldLockIcon } from 'shared/assets/icons/shield-lock';
import { UsersIcon } from 'shared/assets/icons/users';
import { Accounts, useLayer } from 'widgets/accounts-table';
import { Filters } from 'widgets/filters';
import { TaskDrawer } from 'widgets/tasks-drawer';

// const curlCmd = `curl 'https://api2.bybitglobal.com/user/public/find-password/intercept' \
// //   -H 'accept: application/json' \
// //   -H 'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \
// //   -H 'content-type: application/json;charset=UTF-8' \
// //   -b '_by_l_g_d=5769c3d4-2487-b966-d36b-3b1a7fe9a62a; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2219648580308206c-0ed8637340af4d8-1a525636-1405320-1964858030936c4%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22_a_u_v%22%3A%220.0.6%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk2NDg1ODAzMDgyMDZjLTBlZDg2MzczNDBhZjRkOC0xYTUyNTYzNi0xNDA1MzIwLTE5NjQ4NTgwMzA5MzZjNCJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%7D; deviceId=3916da74-76c7-52af-024b-99b4fa2cabf2; _gcl_au=1.1.1688936674.1744970454; BYBIT_REG_REF_prod={"lang":"ru-RU","g":"5769c3d4-2487-b966-d36b-3b1a7fe9a62a","referrer":"www.bybitglobal.com/en/login","source":"bybitglobal.com","medium":"other","url":"https://www.bybitglobal.com/app/user/retrieve","last_refresh_time":"Sat, 19 Apr 2025 20:45:00 GMT","ext_json":{"dtpid":null}}; EO-Bot-Session=4Z2vn2H7FX9eotESZZ1QsfH5Oj3D15-CUSNoEzBMxHWC3XhP6kwlxzWutwz5Ec8b; EO-Bot-SessionId=16668781016948393043; EO-Bot-Token=t04RrKBM4penpBfIKOpFPGjswytqrmHmWGk62kabLgNW_fIxW3HTgqEpszZ5Q1RzXpyMVaUJySLs2e9XmHESiwzL0aK8owdm0Ze3-Xi8RIzQos3QB-Vq9i0ANWTr26Q7sK_Oi0FWkh2gZsgqZXGMyCSsfNvfUsgJCfdP-rZnfqbVdhb7HcGwb_CzXuLqNrXWtiF7my9kYkgcziZ22H3-A3rPzEsPw-afWOneHdRtVvqQ81JdQk4q8l1ZQ1eVnbVdAi0NI2zKBIk_dJPw1lhpF87jvW9X00UGxvb_nFjOuh-lEsNebDztbS6JxKvGLhTSUHXWKBuIzCGN5oSubUodND-PLdAkJdfRCzbl8kyCd_6VNukT8IGaWe7uqD-H0ETO2PuGebz9QstUV4*' \
// //   -H 'guid: 5769c3d4-2487-b966-d36b-3b1a7fe9a62a' \
// //   -H 'lang: en' \
// //   -H 'origin: https://www.bybitglobal.com' \
// //   -H 'platform: pc' \
// //   -H 'priority: u=1, i' \
// //   -H 'referer: https://www.bybitglobal.com/' \
// //   -H 'sec-ch-ua: "Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"' \
// //   -H 'sec-ch-ua-mobile: ?0' \
// //   -H 'sec-ch-ua-platform: "macOS"' \
// //   -H 'sec-fetch-dest: empty' \
// //   -H 'sec-fetch-mode: cors' \
// //   -H 'sec-fetch-site: same-site' \
// //   -H 'traceparent: 00-c1419579b2b1cacf014ac68cd7ef613c-72a8f350ca93c750-01' \
// //   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36' \
// //   -H 'usertoken;' \
// //   --data-raw '{"magpie_token":"17451608117490860816605995053000120341#4aa1006e-6c0f-4cdf-90e6-3d2fb81d2a39","username":"st_3udoseper@rambler.ru","country_code":"","cnt":0,"from":4,"key_version":"v1","proto_ver":"2.1"}'`;
// console.log(Curlparser.parse(curlCmd));

// console.log(
// 	curlconverter.toJavaScript(`curl 'https://api2.bybitglobal.com/user/public/find-password/intercept' \
//   -H 'accept: application/json' \
//   -H 'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \
//   -H 'content-type: application/json;charset=UTF-8' \
//   -b '_by_l_g_d=5769c3d4-2487-b966-d36b-3b1a7fe9a62a; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2219648580308206c-0ed8637340af4d8-1a525636-1405320-1964858030936c4%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22_a_u_v%22%3A%220.0.6%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk2NDg1ODAzMDgyMDZjLTBlZDg2MzczNDBhZjRkOC0xYTUyNTYzNi0xNDA1MzIwLTE5NjQ4NTgwMzA5MzZjNCJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%7D; deviceId=3916da74-76c7-52af-024b-99b4fa2cabf2; _gcl_au=1.1.1688936674.1744970454; BYBIT_REG_REF_prod={"lang":"ru-RU","g":"5769c3d4-2487-b966-d36b-3b1a7fe9a62a","referrer":"www.bybitglobal.com/en/login","source":"bybitglobal.com","medium":"other","url":"https://www.bybitglobal.com/app/user/retrieve","last_refresh_time":"Sat, 19 Apr 2025 20:45:00 GMT","ext_json":{"dtpid":null}}; EO-Bot-Session=4Z2vn2H7FX9eotESZZ1QsfH5Oj3D15-CUSNoEzBMxHWC3XhP6kwlxzWutwz5Ec8b; EO-Bot-SessionId=16668781016948393043; EO-Bot-Token=t04RrKBM4penpBfIKOpFPGjswytqrmHmWGk62kabLgNW_fIxW3HTgqEpszZ5Q1RzXpyMVaUJySLs2e9XmHESiwzL0aK8owdm0Ze3-Xi8RIzQos3QB-Vq9i0ANWTr26Q7sK_Oi0FWkh2gZsgqZXGMyCSsfNvfUsgJCfdP-rZnfqbVdhb7HcGwb_CzXuLqNrXWtiF7my9kYkgcziZ22H3-A3rPzEsPw-afWOneHdRtVvqQ81JdQk4q8l1ZQ1eVnbVdAi0NI2zKBIk_dJPw1lhpF87jvW9X00UGxvb_nFjOuh-lEsNebDztbS6JxKvGLhTSUHXWKBuIzCGN5oSubUodND-PLdAkJdfRCzbl8kyCd_6VNukT8IGaWe7uqD-H0ETO2PuGebz9QstUV4*' \
//   -H 'guid: 5769c3d4-2487-b966-d36b-3b1a7fe9a62a' \
//   -H 'lang: en' \
//   -H 'origin: https://www.bybitglobal.com' \
//   -H 'platform: pc' \
//   -H 'priority: u=1, i' \
//   -H 'referer: https://www.bybitglobal.com/' \
//   -H 'sec-ch-ua: "Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'sec-fetch-dest: empty' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: same-site' \
//   -H 'traceparent: 00-c1419579b2b1cacf014ac68cd7ef613c-72a8f350ca93c750-01' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36' \
//   -H 'usertoken;' \
//   --data-raw '{"magpie_token":"17451608117490860816605995053000120341#4aa1006e-6c0f-4cdf-90e6-3d2fb81d2a39","username":"st_3udoseper@rambler.ru","country_code":"","cnt":0,"from":4,"key_version":"v1","proto_ver":"2.1"}'`),
// );

const getActions = (layer) => {
	switch (layer) {
		case 'general':
			return [
				<ExportAccounts key="export" />,
				<Logout key="logout" />,
				<UpdateProfile key="update" />,
				<CustomRequest key="custom-request" />,
			];
		case '2fa':
			return [
				<ExportAccounts key="export" />,
				<Enable2fa key="enable2fa" />,
				<Disable2fa key="disable2fa" />,
			];
		default:
			return [<ExportAccounts key="export" />];
	}
};

const getMainAction = (layer, props) => {
	switch (layer) {
		case 'balances':
			return <Refresh {...props} />;
		case 'register':
			return <Register {...props} />;
		case 'genereal':
		default:
			return <Login {...props} />;
	}
};

const MainPage = () => {
	const theme = useTheme();

	const layer = useLayer.use.layer();
	const setLayer = useLayer.use.setLayer();
	const handleLayer = (_event, newLayer) => {
		if (newLayer !== null) {
			setLayer(newLayer);
		}
	};

	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxWidth="100%"
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography variant="H3">Accounts</Typography>
				<Stack
					direction="row"
					alignItems="center"
					gap={2}
				>
					<SelectedAccounts />
					<DefaultAccount />
					<TaskDrawer />
				</Stack>
			</Stack>
			<Stack gap={2}>
				<Filters />
				<Grid2
					container
					columns={12}
					spacing={2}
				>
					{/* Main Action */}
					<Grid2 size={2}>
						{getMainAction(layer, {
							sx: { height: '100%' },
						})}
					</Grid2>

					{/* Tables toggler */}
					<Grid2 size={'auto'}>
						<ToggleButtonGroup
							value={layer}
							exclusive
							onChange={handleLayer}
							aria-label="text alignment"
						>
							<Tooltip
								enterDelay={500}
								title="General"
								arrow
							>
								<ToggleButton
									value="general"
									aria-label="left aligned"
								>
									<UsersIcon />
								</ToggleButton>
							</Tooltip>

							<Tooltip
								enterDelay={500}
								title="Balances"
								arrow
							>
								<ToggleButton
									value="balances"
									aria-label="centered"
								>
									<DollarIcon />
								</ToggleButton>
							</Tooltip>

							<Tooltip
								enterDelay={500}
								title="Register"
								arrow
							>
								<ToggleButton
									value="register"
									aria-label="centered"
								>
									<RegisterIcon />
								</ToggleButton>
							</Tooltip>

							<Tooltip
								enterDelay={500}
								title="2FA"
								arrow
							>
								<ToggleButton
									value="2fa"
									aria-label="centered"
								>
									<ShieldLockIcon />
								</ToggleButton>
							</Tooltip>
						</ToggleButtonGroup>
					</Grid2>

					{/* Actions */}
					<Grid2 size={'auto'}>
						<Stack
							justifyContent="center"
							height="100%"
							gap={1}
							direction={'row'}
						>
							{getActions(layer)}
						</Stack>
					</Grid2>
				</Grid2>
			</Stack>
			<Paper
				sx={{
					flexGrow: 1,
					backgroundColor: theme.palette.secondary.dark,
					backgroundImage: 'none',
				}}
			>
				<Accounts />
			</Paper>
		</Stack>
	);
};

export default MainPage;
