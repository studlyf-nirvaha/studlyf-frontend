export async function sendMessageToGemini(prompt: string): Promise<string> {
  try {
    const res = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.reply || "No response from Gemini.";
  } catch (err) {
    console.error("Chat API error:", err);
    return "Sorry, I had trouble fetching that. Please try again later.";
  }
}