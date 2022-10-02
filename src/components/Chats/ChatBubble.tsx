import { Box, Flex } from "@chakra-ui/react";
import { ActiveUser } from "../Users/ActiveUser";

export const ChatBubble = () => {
	return (
		<Flex mb="5" justifyContent="flex-start" flexDirection="column">
			<Box display="flex">
				<ActiveUser />
			</Box>
			<Box w="60%" p="20px" borderRadius="2xl" bgColor="#47476b" color="white">
				Generating random paragraphs can be an excellent way for writers to get
				their creative flow going at the beginning of the day. The writer has no
				idea what topic the random paragraph will be about when it appears.
			</Box>
		</Flex>
	);
};
