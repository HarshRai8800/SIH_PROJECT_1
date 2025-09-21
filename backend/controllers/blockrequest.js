import {db} from "../prismaClient/prisma.js";

export const submitBlockRequest = async (req, res) => {
    try {
        if (!req.auth || !req.auth.userId) {
            return res.status(401).send("Unauthorized");
        }

        const { blockemail, email, reason, role } = req.body;

        if (!blockemail || !reason) {
            return res.status(400).json({ success: false, error: "Block email and reason are required" });
        }

        await db.blockrequest.create({
            data: {
                role,
                reason,
                email: blockemail,
            },
        })

        res.status(200).json({ success: true, message: "Block request submitted successfully" });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export const getBlockRequest = async (req, res) => {
    try {
        if (!req.auth || !req.auth.userId) {
            return res.status(401).send("Unauthorized");
        }

        const allRequest = await db.blockrequest.findMany()

        res.status(200).json({ success: true, allRequest });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}