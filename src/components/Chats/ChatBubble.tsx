import { Box, Flex } from "@chakra-ui/react";
import { ActiveUser } from "../Users/ActiveUser";
import { MessageType } from "./ChatsBox";

type ChatBubbleProps = {
	chat: MessageType;
};

export const ChatBubble = ({ chat }: ChatBubbleProps) => {
	return (
		<Flex mb="5" justifyContent="flex-start" flexDirection="column">
			<Box display="flex">
				<ActiveUser name={chat.user} />
			</Box>
			<Box w="60%" p="20px" borderRadius="2xl" bgColor="#47476b" color="white">
				{chat.message}
			</Box>
		</Flex>
	);
};
