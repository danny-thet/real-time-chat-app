import { Box, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type MessageType = {
	user: string;
	message: string;
};

const user = "User_" + String(new Date().getTime());

export const ChatMain = () => {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [chats, setChats] = useState<MessageType[]>([]);
	const [message, setMessage] = useState<string>("");

	useEffect((): any => {
		// connect to socket server
		const socket = io(process.env.BASE_URL ?? "", {
			path: "/api/socket",
		});

		// log ssocket connection
		socket.on("connect", () => {
			setIsConnected(true);
		});

		// update chat on new message dispatched
		socket.on("message", (message: MessageType) => {
			chats.push(message);
			setChats([...chats]);
		});

		// socket disconnet onUnmount if exists
		if (socket) return () => socket.disconnect();
	}, [chats]);

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

	return (
		<Box>
			<Box my="auto" textAlign="center">
				This is from chat main
			</Box>
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
			</Button>
		</Box>
	);
};