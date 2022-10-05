import { Flex, Button, Input, Box, Heading } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { io } from "socket.io-client";

type NewUserType = {
	name: string;
	id: string;
};

type LoginProps = {
	setIsNameChoosen: Dispatch<SetStateAction<boolean>>;
};

export const Login = ({ setIsNameChoosen }: LoginProps) => {
	const [newUser, setNewUser] = useState<NewUserType>({ name: "", id: "" });

	const [isConnected, setIsConnected] = useState<boolean>(false);

	useEffect(() => {
		// connect to socket server
		const socket = io(process.env.BASE_URL ?? "", {
			path: "/api/socket",
		});

		// log socket connection
		socket.on("connect", async () => {
			setIsConnected(true);
			setNewUser({ name: "New User", id: socket.id });
		});
	}, []);

	const handleOnChangeName = (value: string) => {
		setNewUser({ name: value, id: newUser?.id });
	};

	const handleJoinChat = async () => {
		try {
			await fetch("/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsNameChoosen(true);
		}
	};

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
				<Flex m="auto" alignItems="center" gap="2" h="50%" w="80%">
					<Input
						placeholder="Enter your name"
						size="lg"
						isDisabled={!isConnected}
						onChange={(event) => handleOnChangeName(event.currentTarget.value)}
					/>

					<Button
						bgColor="#3d3d5c"
						_hover={{
							background: "white",
							color: "#3d3d5c",
						}}
						size="lg"
						isDisabled={!isConnected}
						onClick={handleJoinChat}
					>
						JOIN
					</Button>
				</Flex>
			</Box>
		</Box>
	);
};
