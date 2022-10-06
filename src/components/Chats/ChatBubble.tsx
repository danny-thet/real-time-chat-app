import { Box, Flex } from "@chakra-ui/react";
import { ActiveUser } from "../Users/ActiveUser";
import { MessageType } from "./ChatsBox";

type ChatBubbleProps = {
	chat: MessageType;
	userName: string;
};

export const ChatBubble = ({ chat, userName }: ChatBubbleProps) => {
	const isCurrentUser = chat.user === userName;

	const content = isCurrentUser ? "flex-end" : "flex-start";

	const bgColor = isCurrentUser ? "#e68a00" : "#47476b";

	return (
		<>
			<Box display="flex">
				{!isCurrentUser && <ActiveUser size="sm" name={chat.user} />}
			</Box>
			<Flex mb="5" justifyContent={content}>
				<Box
					w="60%"
					p="20px"
					borderRadius="2xl"
					bgColor={bgColor}
					color="white"
				>
					{chat.message}
				</Box>
			</Flex>
		</>
	);
};
