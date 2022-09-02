import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

type Message = {
	author: string;
	message: string;
};

export const ChatMain = () => {
	const [userName, setUserName] = useState("");
	const [chosenUserName, setChosenUserName] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		socketInitializer();
	}, []);

	const socketInitializer = async () => {
		await fetch("/api/socket");

		socket = io();

		socket.on("newIncomingMessage", (msg) => {
			setMessages((currentMsg) => [
				...currentMsg,
				{ author: msg.author, message: msg.message },
			]);
			console.log(messages);
		});
	};

	return <Box>This is ChatMain</Box>;
};
