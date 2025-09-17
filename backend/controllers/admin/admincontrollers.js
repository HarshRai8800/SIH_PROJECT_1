import { clerkClient } from "@clerk/express";
import { db } from "../../prismaClient/prisma.js";

const getAdminEmail = async (clerkId) => {
    const clerkUser = await clerkClient.users.getUser(clerkId);
    const primaryEmailId = clerkUser?.primaryEmailAddressId;
    const primaryEmailObj = clerkUser?.emailAddresses?.find((e) => e.id === primaryEmailId) || clerkUser?.emailAddresses?.[0];
    return primaryEmailObj?.emailAddress || null;
};

export const adminLogin = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;

    try {
        const adminemail = await getAdminEmail(clerkId);
        if (!adminemail) {
            return res.status(400).json({ success: false, error: "Unable to resolve user email from Clerk" });
        }

        const admin = await db.admin.update({
            where: { email: adminemail },
            data: {
                clerkId,
            }
        });

        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        console.log("Admin logged in:", admin);
        res.status(200).json({ success: true, admin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const getAllStudents = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;

    try {
        const adminemail = await getAdminEmail(clerkId);
        if (!adminemail) {
            return res.status(400).json({ success: false, error: "Unable to resolve user email from Clerk" });
        }

        const admin = await db.admin.findUnique({
            where: { email: adminemail },
            include: { students: true }
        });

        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        console.log("Students retrieved:", admin.students);
        res.status(200).json({ success: true, students: admin.students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const addStudent = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;
    const { firstName, lastName, email } = req.body;

    console.log(firstName, lastName, email);

    try {
        const adminemail = await getAdminEmail(clerkId);
        if (!adminemail) {
            return res.status(400).json({ success: false, error: "Unable to resolve user email from Clerk" });
        }

        const admin = await db.admin.findUnique({
            where: { email: adminemail },
        });

        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        const students = await db.students.create({
            data: {
                firstName,
                lastName,
                email,
                adminId: admin.id,
                collegeName:admin.collegeName
            }
        });

        console.log("Student added:", students);
        res.status(200).json({ success: true, students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const deleteStudent = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;
    const { email } = req.body;

    try {
        const adminemail = await getAdminEmail(clerkId);
        if (!adminemail) {
            return res.status(400).json({ success: false, error: "Unable to resolve user email from Clerk" });
        }

        const admin = await db.admin.findUnique({
            where: { email: adminemail },
        });

        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        const students = await db.students.delete({
            where: { email },
        });

        console.log("Student deleted:", students);
        res.status(200).json({ success: true, students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const deleteCounsellor = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;
    const { email } = req.body;

    try {
        const adminemail = await getAdminEmail(clerkId);
        if (!adminemail) {
            return res.status(400).json({ success: false, error: "Unable to resolve user email from Clerk" });
        }

        const admin = await db.admin.findUnique({
            where: { email: adminemail },
        });

        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        const counsellor = await db.counsellor.delete({
            where: { email },
        });

        console.log("Counsellor deleted:", counsellor);
        res.status(200).json({ success: true, counsellor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const addCounsellor = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;
    const { firstName, lastName, email } = req.body;

    try {
        const adminemail = await getAdminEmail(clerkId);
        if (!adminemail) {
            return res.status(400).json({ success: false, error: "Unable to resolve user email from Clerk" });
        }

        const admin = await db.admin.findUnique({
            where: { email: adminemail },
        });

        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        const counsellor = await db.counsellor.create({
            data: {
                firstName,
                lastName,
                email,
                adminId: admin.id,
                collegeName:admin.collegeName
            }
        });

        console.log("Counsellor added:", counsellor);
        res.status(200).json({ success: true, counsellor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const getAllCounsellors = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;

    try {
        const adminemail = await getAdminEmail(clerkId);
        if (!adminemail) {
            return res.status(400).json({ success: false, error: "Unable to resolve user email from Clerk" });
        }

        const admin = await db.admin.findUnique({
            where: { email: adminemail },
            include: { counsellors: true }
        });

        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        console.log("Counsellors retrieved:", admin.counsellors);
        res.status(200).json({ success: true, counsellors: admin.counsellors });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};
