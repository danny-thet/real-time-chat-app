import { Avatar, Flex, Text } from "@chakra-ui/react";

type ActiveUserProps = {
	name: string;
};

export const ActiveUser = ({ name }: ActiveUserProps) => {
	return (
		<Flex gap="2" mb="5" alignItems="center" justifyContent="center">
			<Avatar name={name} />
			<Text color="white">{name}</Text>
		</Flex>
	);
};
