import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
	socket: Socket & {
		server: NetServer & {
			io: SocketIOServer;
		};
	};
};

interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: Buffer) => void;
	withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
	hello: () => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	name: string;
	age: number;
}

export default function SocketHandler(
	req: NextApiRequest,
	res: NextApiResponseServerIO
) {
	if (res?.socket?.server?.io) {
		console.log("Sever already set up");
		res.end();
		return;
	}

	// const io = new SocketIOServer<
	// 	ClientToServerEvents,
	// 	ServerToClientEvents,
	// 	InterServerEvents,
	// 	SocketData
	// >(res?.socket?.server);

	const httpServer: NetServer = res.socket.server as any;
	const io = new SocketIOServer(httpServer, {
		path: "/api/socketio",
	});

	return;
}
