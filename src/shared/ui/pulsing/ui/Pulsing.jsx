import { Box, keyframes } from '@mui/material';

const pulse = keyframes`
0% {
    transform: scale(0.95);
    opacity: 0.5;
}
50% {
    transform: scale(1);
    opacity: 1;
}
100% {
    transform: scale(0.95);
    opacity: 0.5;
}
`;

const Pulsing = ({
	size = 8,
	color = 'warning.main',
	animate = true,
	sx,
	...props
}) => {
	return (
		<Box
			sx={{
				width: size,
				height: size,
				backgroundColor: color,
				borderRadius: '50%',
				animation: animate && `${pulse} 1.5s ease-in-out infinite`,
				...sx,
			}}
			{...props}
		/>
	);
};

export default Pulsing;
