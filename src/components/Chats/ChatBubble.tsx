import { Box, Flex } from "@chakra-ui/react";
import { MessageType } from "../../type/chat";
import { ActiveUser } from "../Users/ActiveUser";

type ChatBubbleProps = {
	chat: MessageType;
	userId: string;
	isSameUser: boolean;
};

export const ChatBubble = ({ chat, userId, isSameUser }: ChatBubbleProps) => {
	const isCurrentUser = chat.userId === userId;

	const content = isCurrentUser ? "flex-end" : "flex-start";

	const bgColor = isCurrentUser ? "#e68a00" : "#47476b";

	return (
		<>
			<Box display="flex">
				{!isSameUser && !isCurrentUser && (
					<ActiveUser size="sm" name={chat.user} />
				)}
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
