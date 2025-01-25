// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage (replace with a database in production)
const userData: Record<string, string> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { discordID, robloxID } = req.body;

            // Validate input
            if (!discordID || !robloxID) {
                return res.status(400).json({ error: "Both 'discordID' and 'robloxID' are required." });
            }

            // Check if Discord ID already exists
            if (userData[discordID]) {
                return res.status(409).json({ error: "Discord ID already exists." });
            }

            // Add to storage
            userData[discordID] = robloxID;
            return res.status(201).json({ message: "User added successfully." });

        case 'GET':
            const { id } = req.query;

            if (typeof id !== 'string') {
                return res.status(400).json({ error: "Invalid ID parameter." });
            }

            const foundRobloxID = userData[id];
            if (!foundRobloxID) {
                return res.status(404).json({ error: "User not found." });
            }

            return res.status(200).json({ discordID: id, robloxID: foundRobloxID });

        default:
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
