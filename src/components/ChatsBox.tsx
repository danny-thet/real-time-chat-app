import { Box, Button, Flex, Input } from "@chakra-ui/react";

export const ChatsBox = () => {
	return (
		<Box w="70%" h="100%" mr="10" ml="5" borderRadius="xl" bgColor="#666699">
			<Box
				h="83%"
				mt="5"
				px="10"
				overflow="auto"
				sx={{
					"&::-webkit-scrollbar": {
						width: "16px",
						borderRadius: "8px",
						backgroundColor: `rgba(0, 0, 0, 0.05)`,
					},
					"&::-webkit-scrollbar-thumb": {
						borderRadius: "8px",
						backgroundColor: `rgba(0, 0, 0, 0.05)`,
					},
				}}
			>
				Generating random paragraphs can be an excellent way for writers to get
				their creative flow going at the beginning of the day. The writer has no
				idea what topic the random paragraph will be about when it appears. This
				forces the writer to use creativity to complete one of three common
				writing challenges. The writer can use the paragraph as the first one of
				a short story and build upon it. A second option is to use the random
				paragraph somewhere in a short story they create. The third option is to
				have the random paragraph be the ending paragraph in a short story. No
				matter which of these challenges is undertaken, the writer is forced to
				use creativity to incorporate the paragraph into their
				writing.Generating random paragraphs can be an excellent way for writers
				to get their creative flow going at the beginning of the day. The writer
				has no idea what topic the random paragraph will be about when it
				appears. This forces the writer to use creativity to complete one of
				three common writing challenges. The writer can use the paragraph as the
				first one of a short story and build upon it. A second option is to use
				the random paragraph somewhere in a short story they create. The third
				option is to have the random paragraph be the ending paragraph in a
				short story. No matter which of these challenges is undertaken, the
				writer is forced to use creativity to incorporate the paragraph into
				their writing.Generating random paragraphs can be an excellent way for
				writers to get their creative flow going at the beginning of the day.
				The writer has no idea what topic the random paragraph will be about
				when it appears. This forces the writer to use creativity to complete
				one of three common writing challenges. The writer can use the paragraph
				as the first one of a short story and build upon it. A second option is
				to use the random paragraph somewhere in a short story they create. The
				third option is to have the random paragraph be the ending paragraph in
				a short story. No matter which of these challenges is undertaken, the
				writer is forced to use creativity to incorporate the paragraph into
				their writing.Generating random paragraphs can be an excellent way for
				writers to get their creative flow going at the beginning of the day.
				The writer has no idea what topic the random paragraph will be about
				when it appears. This forces the writer to use creativity to complete
				one of three common writing challenges. The writer can use the paragraph
				as the first one of a short story and build upon it. A second option is
				to use the random paragraph somewhere in a short story they create. The
				third option is to have the random paragraph be the ending paragraph in
				a short story. No matter which of these challenges is undertaken, the
				writer is forced to use creativity to incorporate the paragraph into
				their writing.
			</Box>
			<Flex my="4" mx="10" minH="100px">
				<Input
					bgColor="white"
					type="text"
					size="lg"
					// value={message}
					// placeholder={isConnected ? "Type a message..." : "Connecting..."}
					// disabled={!isConnected}
					// onChange={(e) => {
					// 	setMessage(e.target.value);
					// }}
					// onKeyPress={(e) => {
					// 	if (e.key === "Enter") {
					// 		sendMessage();
					// 	}
					// }}
				/>
				<Button
					ml="4"
					size="lg"
					// onClick={sendMessage} disabled={!isConnected}
				>
					SEND
				</Button>
			</Flex>
		</Box>
	);
};
