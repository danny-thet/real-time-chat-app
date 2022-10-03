import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../type/next";

export default function UserHandler(
	req: NextApiRequest,
	res: NextApiResponseServerIO
) {
	if (req.method === "POST") {
		const newUsers = req.body;
		console.log("🚀 ~ file: users.ts ~ line 10 ~ newUsers", newUsers);

		res.socket.server.io.emit("users", newUsers);

		res.status(201).json(newUsers);
	}
}
