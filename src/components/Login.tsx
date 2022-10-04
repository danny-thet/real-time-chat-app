import { Flex, Button, Input, Box, Heading } from "@chakra-ui/react";

export const Login = () => {
	return (
		<Box display="flex" h="100vh" alignItems="center">
			<Box
				h="40%"
				w="30%"
				margin="auto"
				borderRadius="2xl"
				bgColor="#47476b"
				color="white"
				alignItems="center"
			>
				<Heading as="h1" size="4xl" mt="20" sx={{ textAlign: "center" }}>
					Chip Chat
				</Heading>
				<Flex m="auto" alignItems="center" gap="2" h="50%" w="80%">
					<Input placeholder="Enter your name" size="lg" />

					<Button
						bgColor="#3d3d5c"
						_hover={{
							background: "white",
							color: "#3d3d5c",
						}}
						size="lg"
					>
						JOIN
					</Button>
				</Flex>
			</Box>
		</Box>
	);
};
