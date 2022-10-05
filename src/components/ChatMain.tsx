import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ChatsBox } from "./Chats/ChatsBox";

import { Login } from "./Login";
import { ActiveUser } from "./Users/ActiveUser";
import { ActiveUsersBox } from "./Users/ActiveUsersBox";

type MessageType = {
	user: string;
	message: string;
};

type NewUserType = {
	name: string;
	id: string;
};

const user = "User_" + String(new Date().getTime());

let users: NewUserType[] = [];

export const ChatMain = () => {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [chats, setChats] = useState<MessageType[]>([]);
	const [isNameChoosen, setIsNameChoosen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [usersList, setUsersList] = useState<NewUserType[]>([]);

	useEffect(() => {
		const socket = io(process.env.BASE_URL ?? "", {
			path: "/api/socket",
		});

		socket.on("connect", async () => {
			setIsConnected(true);
		});

		socket.on("user", async (newUser: NewUserType) => {
			users.push(newUser);
			await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(users),
			});
		});

		socket.on("users", (data) => {
			return setUsersList(data);
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
	}, [usersList]);

	const sendMessage = async () => {
		if (message) {
			const newMessage: MessageType = {
				user,
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

	return (
		<Box bgColor="#3d3d5c">
			{isNameChoosen ? (
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
										<ActiveUser />
									</Flex>
								</Box>
								<Button>Leave Chat</Button>
							</Flex>
						</Box>
						<ChatsBox />
					</Box>
				</>
			) : (
				<Login setIsNameChoosen={setIsNameChoosen} />
			)}
		</Box>
	);
};
