import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ChatsBox } from "./Chats/ChatsBox";

import { Login } from "./Login";
import { ActiveUser } from "./Users/ActiveUser";

type MessageType = {
	user: string;
	message: string;
};

export const ChatMain = () => {
	// states
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [chats, setChats] = useState<MessageType[]>([]);
	const [userName, setUserName] = useState<string>("");

	// effect
	useEffect(() => {
		const socket = io(process.env.BASE_URL ?? "", {
			path: "/api/socket",
		});

		socket.on("connect", async () => {
			setIsConnected(true);
		});

		socket.on("message", (message: MessageType) => {
			chats.push(message);
			setChats([...chats]);
		});

		if (socket) {
			return () => {
				socket.disconnect();
			};
		}
	}, [chats]);

	const handleJoinChat = async (name: string) => {
		setUserName(name);
	};

	return (
		<Box bgColor="#3d3d5c">
			{!!userName ? (
				<>
					<Box h="80vh">
						<Box mt="10">
							<Flex w="80%" mx="auto" justifyContent={"flex-start"}>
								<Box flex={1}>
									<Flex>
										<ActiveUser name={userName} />
									</Flex>
								</Box>
								<Button
									onClick={() => {
										setUserName("");
										setChats([]);
									}}
								>
									Leave Chat
								</Button>
							</Flex>
						</Box>
						<ChatsBox
							chats={chats}
							userName={userName}
							isConnected={isConnected}
						/>
					</Box>
				</>
			) : (
				<Login onJoinChat={handleJoinChat} />
			)}
		</Box>
	);
};
