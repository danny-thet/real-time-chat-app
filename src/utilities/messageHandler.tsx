export const messageHandler = (_: any, socket: any) => {
	const createMessage = (msg: any) => {
		socket.broadcast.emit("newIncomingMessage", msg);
	};

	socket.on("createMessage", createMessage);
};
