import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../type/next";

export default function UserHandler(
	req: NextApiRequest,
	res: NextApiResponseServerIO
) {
	if (req.method === "POST") {
		const newUser = req.body;

		res.socket.server.io.emit("user", newUser);

		res.status(201).json(newUser);
	}
}
