import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ActiveUsersBox } from "./Users/ActiveUsersBox";
import { ChatsBox } from "./Chats/ChatsBox";
import { Socket } from "socket.io";

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
	const [newUser, setNewUser] = useState<NewUserType>();

	const [message, setMessage] = useState<string>("");

	const [usersList, setUsersList] = useState<NewUserType[]>([]);

	useEffect(() => {
		// connect to socket server
		const socket = io(process.env.BASE_URL ?? "", {
			path: "/api/socket",
		});
		// log socket connection
		socket.on("connect", async () => {
			setIsConnected(true);
			setNewUser({ name: "New", id: socket.id });
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
		});

		// update chat on new message dispatched
		socket.on("message", (message: MessageType) => {
			chats.push(message);
			setChats([...chats]);
		});

		// socket disconnet onUnmount if exists
		if (socket) {
			return () => {
				socket.disconnect();
			};
		}
	}, [chats, usersList]);

	const sendMessage = async () => {
		if (message) {
			// build message obj
			const newMessage: MessageType = {
				user,
				message,
			};

			// dispatch message to other users
			const resp = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newMessage),
			});

			// reset field if OK
			if (resp.ok) setMessage("");
		}
	};

	const join = async () => {
		await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		});
	};

	return (
		<Box bgColor="#3d3d5c">
			<Box>
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
			<Box>
				{usersList
					? usersList?.map((user, index) => {
							return <Box key={index}>{user.id}</Box>;
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
			<Button onClick={join} disabled={!isConnected}>
				JOIN
			</Button>
			<Button onClick={sendMessage} disabled={!isConnected}>
				SEND
			</Button>
			<Box h="100vh">
				<Flex justifyContent="flex-end">
					<Box mx="10" my="5">
						<Button>Leave Chat</Button>
					</Box>
				</Flex>
				<Flex h="88%">
					<ActiveUsersBox />
					<ChatsBox />
				</Flex>
			</Box>
		</Box>
	);
};
