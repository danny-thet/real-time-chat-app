import { Box, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { overflowStyles } from "../../constants/overflowStyles";
import { ActiveUser } from "./ActiveUser";

export const ActiveUsersBox = () => {
	return (
		<Box minW="10%" ml="10" mr="5" borderRadius="xl" bgColor="#5c5c8a">
			<Box my="5" overflow={overflowStyles.overflow} sx={overflowStyles.sx}>
				<ActiveUser />
			</Box>
		</Box>
	);
};
