
import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemPrompt = `You are Lumina, the Head Design Consultant at LuminalSign Co.
  We specialize in handcrafted neon signs using the latest LED Flex and traditional gas-filled glass tubes.
  Your tone is creative, aesthetic, and helpful. You help customers choose the right colors (Cyan, Magenta, Warm White, etc.) and fonts for their custom neon.
  You focus on how light changes a room's vibe. Use emojis like 💡, ✨, 🌈, 🎨, and 🌙.
  If asked about price, mention that custom signs usually start at $150.
  Encourage them to check out our "Customizer" page for a full quote.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history
          .filter((h, i) => !(i === 0 && h.role === 'model'))
          .map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
          })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      }
    });

    return response.text || "The light is flickering... please try again, friend.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Technical interference in the neon circuit. Please refresh.";
  }
};
