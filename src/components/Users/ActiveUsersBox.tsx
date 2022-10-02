import { Box, Divider } from "@chakra-ui/react";
import { overflowStyles } from "../../constants/overflowStyles";
import { ActiveUser } from "./ActiveUser";

export const ActiveUsersBox = () => {
	return (
		<Box minW="10%" ml="10" mr="5" borderRadius="xl" bgColor="#666699">
			<Box
				h="94%"
				my="5"
				overflow={overflowStyles.overflow}
				sx={overflowStyles.sx}
			>
				<ActiveUser />
				<ActiveUser />
				<ActiveUser />
			</Box>
		</Box>
	);
};
