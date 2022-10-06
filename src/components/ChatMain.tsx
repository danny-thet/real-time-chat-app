import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MessageType } from "../type/chat";
import { ChatsBox } from "./Chats/ChatsBox";

import { Login } from "./Login";
import { ActiveUser } from "./Users/ActiveUser";

export const ChatMain = () => {
	// states
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [chats, setChats] = useState<MessageType[]>([]);
	const [userName, setUserName] = useState<string>("");
	const [userId, setUserId] = useState<string>("");
	const [leaveChat, setLeaveChat] = useState<boolean>(false);

	// effect
	useEffect(() => {
		const socket = io(process.env.BASE_URL ?? "", {
			path: "/api/socket",
		});

		socket.on("connect", async () => {
			setIsConnected(true);
			setUserId(socket.id);
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
	}, [leaveChat]);

	const handleJoinChat = async (name: string) => {
		setUserName(name);
		setLeaveChat(false);
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
										setLeaveChat(true);
									}}
								>
									Leave Chat
								</Button>
							</Flex>
						</Box>
						<ChatsBox
							chats={chats}
							userId={userId}
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
