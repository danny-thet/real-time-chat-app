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
	const [message, setMessage] = useState<string>("");
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

	// events
	const sendMessage = async () => {
		if (message) {
			const newMessage: MessageType = {
				user: userName,
				message,
			};

			const resp = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newMessage),
			});

			if (resp.ok) setMessage("");
		}
	};

	const handleJoinChat = async (name: string) => {
		setUserName(name);
	};

	return (
		<Box bgColor="#3d3d5c">
			{!!userName ? (
				<>
					{/* <Box>
						{chats
							? chats?.map((chat, index) => {
									return (
										<Box key={index}>
											{chat.user === user ? "me" : chat.user} : {chat.message}
										</Box>
									);
							  })
							: "No chat messages"}
					</Box>

					<Input
						type="text"
						value={message}
						placeholder={isConnected ? "Type a message..." : "Connecting..."}
						disabled={!isConnected}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								sendMessage();
							}
						}}
					/>
					<Button onClick={sendMessage} disabled={!isConnected}>
						SEND
					</Button> */}
					<Box h="80vh">
						<Box mt="10">
							<Flex w="80%" mx="auto" justifyContent={"flex-start"}>
								<Box flex={1}>
									<Flex>
										<ActiveUser name={userName} />
									</Flex>
								</Box>
								<Button>Leave Chat</Button>
							</Flex>
						</Box>
						<ChatsBox />
					</Box>
				</>
			) : (
				<Login onJoinChat={handleJoinChat} />
			)}
		</Box>
	);
};
