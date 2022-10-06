import { Avatar, Flex, Text } from "@chakra-ui/react";

type ActiveUserProps = {
	size?: string;
	name: string;
};

export const ActiveUser = ({ size, name }: ActiveUserProps) => {
	return (
		<Flex gap="2" mb="5" alignItems="center" justifyContent="center">
			<Avatar name={name} size={size} />
			<Text color="white">{name}</Text>
		</Flex>
	);
};
