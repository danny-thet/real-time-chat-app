import { Flex, Button, Input, Box, Heading } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { io } from "socket.io-client";

type LoginProps = {
	onJoinChat: (userName: string) => void;
};

export const Login = ({ onJoinChat }: LoginProps) => {
	const [name, setName] = useState<string>("");

	return (
		<Box display="flex" h="100vh" alignItems="center">
			<Box
				h="40%"
				minW="30%"
				margin="auto"
				borderRadius="2xl"
				bgColor="#47476b"
				color="white"
				alignItems="center"
			>
				<Heading as="h1" size="4xl" mt="20" sx={{ textAlign: "center" }}>
					Chip Chat
				</Heading>
				<Flex gap="2" m="auto" h="50%" w="80%" alignItems="center">
					<Input
						size="lg"
						placeholder="Enter your name"
						value={name}
						onChange={(event) => setName(event.currentTarget.value)}
					/>

					<Button
						bgColor="#3d3d5c"
						_hover={{
							background: "white",
							color: "#3d3d5c",
						}}
						size="lg"
						onClick={() => onJoinChat(name)}
					>
						JOIN
					</Button>
				</Flex>
			</Box>
		</Box>
	);
};
