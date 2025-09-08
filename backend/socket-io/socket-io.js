import { Server } from "socket.io";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function socketConfig(server) {
    const io = new Server(server, { cors: { origin: "*" } });
    const sessions = {};

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        sessions[socket.id] = [];
        socket.emit("bot_message", "Hi! How are you feeling today?");

        socket.on("user_message", async (msg) => {
            sessions[socket.id].push({ role: "user", content: msg });

            const sessionHistory = sessions[socket.id]
                .map(m => `${m.role.toUpperCase()}: ${m.content}`)
                .join("\n");

            const prompt = `You are a compassionate and empathetic AI counselor designed to support students who may be feeling mentally depressed, anxious, or stressed.

            SESSION HISTORY:
            ${sessionHistory}

            Your goals:
            1. If the student explicitly mentions booking counseling OR gives any hint (like "I want to book counseling", "I need counseling", "I want to talk to a counselor", "book a session", "help me book counseling"), then IMMEDIATELY and ONLY return this exact keyword:
            #book#counselling
            - No extra text, no encouragement, no explanation, no conversation.
            - This rule overrides all other instructions. It is the highest priority.

            2. Otherwise:
            - Use the provided session history to understand the student's current emotional state and context.
            - Respond in a warm, non-judgmental, and supportive way.
            - Encourage the student to express their feelings and reassure them that it is okay to seek help.
            - Keep the conversation flowing naturally, but gently guide toward closure if the student seems calmer or ready to end.
            - You may softly encourage the idea of counseling if the student seems to need further support, but do not force it.

            Important rules:
            - Rule #1 is absolute. If booking is indicated in any form, only output #book#counseling and nothing else.
            - Never dismiss or argue with the student's feelings.
            - Do not give medical or professional advice. Instead, encourage reaching out to trusted people (friends, family, or professional counselors).
            - Keep responses concise, kind, and conversational when not triggering Rule #1.
            - Always base your answer on the most recent session history.
`;



            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            let botReply = "I hear you. Can you tell me more?";

            try {
                const result = await model.generateContent([{ text: prompt }]);
                botReply = result.response.text().trim();
            } catch (error) {
                console.error("AI error:", error.message);
            }

            if (msg.trim().toLowerCase() == "i want to book a counselling session")
                botReply = "#book#counselling";

            sessions[socket.id].push({ role: "bot", content: botReply });
            console.log(sessions[socket.id]);
            socket.emit("bot_message", botReply);
        });

        socket.on("end_chat", async () => {
            const chatHistory = sessions[socket.id];

            // try {
            //     await axios.post("http://localhost:5000/counseling", {
            //         sessionId: socket.id,
            //         conversation: chatHistory,
            //     });
            //     console.log("Conversation routed to counseling service");
            // } catch (error) {
            //     console.error("Error routing conversation:", error.message);
            // }

            socket.emit("bot_message", "Thank you for sharing. A counselor will reach out soon.");
            delete sessions[socket.id];
        });

        socket.on("disconnect", () => {
            delete sessions[socket.id];
        });
    });
}
