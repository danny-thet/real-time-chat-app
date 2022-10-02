import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export const ActiveUser = () => {
	return (
		<Flex gap="2" mb="5" mx="3" alignItems="center" justifyContent="center">
			<Avatar name="Danny Thet" />
			<Text color="white">Danny Thet</Text>
		</Flex>
	);
};
