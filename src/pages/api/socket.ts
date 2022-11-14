import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "../../type/next";

const SocketHandler = async (
	req: NextApiRequest,
	res: NextApiResponseServerIO
) => {
	if (!res.socket.server.io) {
		console.log("New Socket.io server...");
		const httpServer: NetServer = res.socket.server as any;
		const io = new ServerIO(httpServer, {
			path: "/api/socket",
		});
		res.socket.server.io = io;
	}
	res.end();

	console.log("format");
};

export default SocketHandler;
