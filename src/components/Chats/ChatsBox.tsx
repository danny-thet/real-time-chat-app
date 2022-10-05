import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { overflowStyles } from "../../constants/overflowStyles";
import { ChatBubble } from "./ChatBubble";

export type MessageType = {
	user: string;
	message: string;
};

type ChatsBoxProps = {
	isConnected: boolean;
	chats: MessageType[];
	userName: string;
};

export const ChatsBox = ({ userName, chats, isConnected }: ChatsBoxProps) => {
	const [message, setMessage] = useState<string>("");

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

	return (
		<Box w="80%" h="100%" pt="7" mx="auto" borderRadius="xl" bgColor="#5c5c8a">
			<Box
				h="83%"
				px="10"
				overflow={overflowStyles.overflow}
				sx={overflowStyles.sx}
			>
				{chats.map((chat) => {
					return <ChatBubble key={chat.user} chat={chat} />;
				})}
			</Box>
			<Flex m="auto" mt="4" minH="100px" w="70%">
				<Input
					bgColor="white"
					type="text"
					size="lg"
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							sendMessage();
						}
					}}
					placeholder={isConnected ? "Type a message..." : "Connecting..."}
					disabled={!isConnected}
				/>
				<Button ml="4" size="lg" onClick={sendMessage} disabled={!isConnected}>
					SEND
				</Button>
			</Flex>
		</Box>
	);
};
