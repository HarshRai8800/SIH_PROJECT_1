import { createAgent, gemini } from "@inngest/agent-kit";


const analyzeTicket = async(ticket)=>{
    const supportAgent = createAgent({
        model:gemini({
            model:"gemini-1.5-flash-8b",
            apiKey:process.env.GEMINI_API_KEY,
        }),
        name:"AI Counseller Type referal Agent",
        system:`You are an expert AI assistant that processes psychological counseller tickets. 

Your job is to:
1. Summarize the psychological issue.
2. Estimate its severity.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,


    });

   const response =  supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
Analyze the following support ticket and provide a JSON object with:

- description: A short 1-2 sentence summary of the issue.
- severity: One of "Normal", "Medium", or "Emergency".
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["Anxiety Disorders","Depression]).
- counseller Type - assign the counseller type by analysing the data of the user it should be strictly from this list ["GENERAL_COUNSELOR","ACADEMIC_COUNSELOR","PSYCHIATRIST","PEER_SUPPORT_VOLUNTEER"].   
Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
  "summary": "The student is facing extreme anxiety before exams and requested urgent counselling support.",
  "severity": "Normal",
  "relatedSkills": ["Anxiety", "Stress Management", "Exam Pressure"]
}

---

Ticket information:

- Summary: ${ticket.discription}
- Severity: ${ticket.severity}
- Concerns: ${(ticket.consern || []).map(c => c.name).join(", ")}
- Related Skills: ${(ticket.counsellor?.relatedSkills || []).join(", ")}
  `)

const raw = response.output[0].context;


try {
    raw.match(/```json\s*([\s\S]*?)\s*```/i)
    const jsonString = match?match[1]:raw.trim();
    return JSON.parse(jsonString)
} catch (error) {
    console.log("Failed to parse JSON from AI response"+ error.message);
    return null;
}
}

export default analyzeTicket
