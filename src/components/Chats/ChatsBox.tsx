import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { overflowStyles } from "../../constants/overflowStyles";
import { MessageType } from "../../type/chat";
import { ChatBubble } from "./ChatBubble";

type ChatsBoxProps = {
	isConnected: boolean;
	chats: MessageType[];
	userName: string;
	userId: string;
};

export const ChatsBox = ({
	userName,
	chats,
	isConnected,
	userId,
}: ChatsBoxProps) => {
	const bottomRef = useRef<null | HTMLElement>(null);
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chats]);

	const sendMessage = async () => {
		if (message) {
			const newMessage: MessageType = {
				user: userName,
				userId: userId,
				message,
			};

			try {
				const resp = await fetch("/api/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newMessage),
				});
				if (resp.ok) setMessage("");
			} catch (error) {
				console.log(error);
			}
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
				{chats.map((chat, index) => {
					const previousChat = chats[index - 1];
					const isSameUser = chat.userId === previousChat?.userId;

					return (
						<ChatBubble
							key={chat.user}
							chat={chat}
							userId={userId}
							isSameUser={isSameUser}
						/>
					);
				})}
				<Box ref={bottomRef as React.RefObject<HTMLDivElement>} />
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
